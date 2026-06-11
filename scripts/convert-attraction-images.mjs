/**
 * Конвертує HEIC/JPEG/PNG у WebP у public/images/excursions/attractions/<slug>/.
 * Картки атракціонів - до 1200×900 (4:3), quality 82.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const heicConvert = require('heic-convert')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const baseDir = path.join(root, 'public', 'images', 'excursions', 'attractions')

const WEBP_QUALITY = 82
const MAX_WIDTH = 1200
const MAX_HEIGHT = 900

const INPUT_EXTS = /\.(heic|heif|jpg|jpeg|png)$/i

async function inputToSharp(inPath) {
	const ext = path.extname(inPath)
	const buf = fs.readFileSync(inPath)
	if (/\.(heic|heif)$/i.test(ext)) {
		const jpegBuffer = await heicConvert({
			buffer: buf,
			format: 'JPEG',
			quality: 0.92,
		})
		return sharp(jpegBuffer)
	}
	return sharp(buf)
}

async function convertFile(inPath, outPath) {
	const before = fs.statSync(inPath).size
	const pipeline = await inputToSharp(inPath)
	const buffer = await pipeline
		.rotate()
		.resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
		.webp({ quality: WEBP_QUALITY, effort: 4 })
		.toBuffer()
	fs.writeFileSync(outPath, buffer)
	const after = buffer.length
	const rel = path.relative(root, inPath)
	console.log(rel, '→', path.relative(root, outPath), `${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`)
}

async function main() {
	if (!fs.existsSync(baseDir)) {
		console.error('missing:', baseDir)
		process.exit(1)
	}
	const subdirs = fs.readdirSync(baseDir, { withFileTypes: true }).filter(d => d.isDirectory())
	let count = 0
	for (const sub of subdirs) {
		const dir = path.join(baseDir, sub.name)
		for (const file of fs.readdirSync(dir)) {
			if (!INPUT_EXTS.test(file)) continue
			const inPath = path.join(dir, file)
			const outPath = path.join(dir, file.replace(INPUT_EXTS, '.webp'))
			await convertFile(inPath, outPath)
			count++
		}
	}
	if (count === 0) console.log('no input images in', baseDir)
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
