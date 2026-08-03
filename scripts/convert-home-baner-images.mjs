/**
 * Конвертує PNG/JPEG у WebP для банерів головної (public/images/baner/).
 * Розмір зображення не змінюється - лише формат і стиснення.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dir = path.join(root, 'public', 'images', 'baner')

const WEBP_QUALITY = 82

const INPUT_EXTS = /\.(jpg|jpeg|png)$/i

const OUT_NAMES = {
	'Day_off.png': 'day-off.webp',
	'Summer_5_4.png': 'summer-5-4.webp',
	'TUR_5+1.png': 'tur-5-plus-1.webp',
	'atracion_vipochinok.jpeg': 'atracion-vidpochynok.webp',
}

async function encodeWebp(inPath, outPath) {
	const before = fs.statSync(inPath).size
	const buffer = await sharp(inPath)
		.rotate()
		.webp({ quality: WEBP_QUALITY, effort: 4 })
		.toBuffer()
	fs.writeFileSync(outPath, buffer)
	const after = buffer.length
	console.log(path.basename(inPath), '→', path.basename(outPath), `${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`)
}

async function main() {
	if (!fs.existsSync(dir)) {
		console.error('missing:', dir)
		process.exit(1)
	}
	const files = fs.readdirSync(dir).filter(f => INPUT_EXTS.test(f))
	if (files.length === 0) {
		console.log('no input images in', dir)
		return
	}
	for (const file of files) {
		const outName = OUT_NAMES[file] ?? file.replace(INPUT_EXTS, '.webp').toLowerCase()
		await encodeWebp(path.join(dir, file), path.join(dir, outName))
	}
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
