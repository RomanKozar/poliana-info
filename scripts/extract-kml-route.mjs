/**
 * Витягує LineString з KML → data/excursion-routes/<name>-path.ts
 * Usage: node scripts/extract-kml-route.mjs <input.kml> <output-basename>
 * Example: node scripts/extract-kml-route.mjs "path/Uzhorod.kml" uzhhorod-bus
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const [inputArg, baseName] = process.argv.slice(2)
if (!inputArg || !baseName) {
	console.error('Usage: node scripts/extract-kml-route.mjs <input.kml> <output-basename>')
	process.exit(1)
}

function parsePlacemarkName(block) {
	const cdata = block.match(/<name><!\[CDATA\[([\s\S]*?)\]\]><\/name>/)
	if (cdata) return cdata[1].trim()
	const plain = block.match(/<name>([^<]+)<\/name>/)
	return plain?.[1]?.trim() ?? ''
}

const inputPath = path.isAbsolute(inputArg) ? inputArg : path.join(root, inputArg)
const xml = fs.readFileSync(inputPath, 'utf8')

const coordBlock = xml.match(/<LineString>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>/)
if (!coordBlock) {
	console.error('No LineString coordinates found in', inputPath)
	process.exit(1)
}

const raw = coordBlock[1].trim().split(/\s+/).filter(Boolean)
const pathPoints = raw.map(token => {
	const [lng, lat] = token.split(',').map(Number)
	return { lat, lng }
})

const namedPoints = [...xml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)]
	.map(([, block]) => block)
	.filter(block => block.includes('<Point>') && !block.includes('<LineString>'))
	.map(block => {
		const name = parsePlacemarkName(block)
		const coords = block.match(/<Point>[\s\S]*?<coordinates>\s*([^<]+?)\s*<\/coordinates>/)?.[1]?.trim()
		return name && coords ? [name, coords] : null
	})
	.filter(Boolean)

let start = pathPoints[0]
let end = pathPoints[pathPoints.length - 1]

for (const [name, coords] of namedPoints) {
	const [lng, lat] = coords.split(',').map(Number)
	if (/поляна|цнап/i.test(name)) start = { lat, lng }
}

const lastNamed = namedPoints.filter(([name]) => !/поляна|цнап/i.test(name)).at(-1)
if (lastNamed) {
	const [, coords] = lastNamed
	const [lng, lat] = coords.split(',').map(Number)
	end = { lat, lng }
}

const stops = namedPoints.map(([name, coords], index) => {
	const [lng, lat] = coords.split(',').map(Number)
	const shortName = name.split(',')[0].trim().replace(/^Замок\s+/i, 'Замок ')
	const label = String.fromCharCode(65 + index)
	return { label, name: shortName, lat, lng }
})

const outDir = path.join(root, 'data', 'excursion-routes')
fs.mkdirSync(outDir, { recursive: true })

const exportName = baseName
	.split(/[-_]+/)
	.map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
	.join('') + 'Route'
const outFile = path.join(outDir, `${baseName}-path.ts`)

const stopsBlock =
	stops.length > 0
		? `	stops: [
${stops.map(s => `\t\t{ label: '${s.label}', name: ${JSON.stringify(s.name)}, lat: ${s.lat}, lng: ${s.lng} },`).join('\n')}
	] as const,
`
		: ''

const body = `/** Auto-generated from ${path.basename(inputPath)} — do not edit by hand. */
export const ${exportName} = {
	start: { lat: ${start.lat}, lng: ${start.lng} },
	end: { lat: ${end.lat}, lng: ${end.lng} },
${stopsBlock}	path: [
${pathPoints.map(p => `\t\t{ lat: ${p.lat}, lng: ${p.lng} },`).join('\n')}
	] as const,
} as const
`

fs.writeFileSync(outFile, body)
console.log('Wrote', path.relative(root, outFile), `(${pathPoints.length} points, ${stops.length} stops)`)
