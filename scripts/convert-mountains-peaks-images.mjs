/**
 * Картки «Вершини та оглядові точки»: peaks-*.jpg → peaks-*.webp
 * Вхід:  public/images/excursions/mountains/peaks/*
 * Вихід: public/images/excursions/mountains/peaks/peaks-<n>.webp
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const heicConvert = require('heic-convert')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, '..', 'public', 'images', 'excursions', 'mountains', 'peaks')

const MAX_WIDTH = 1280
const MAX_HEIGHT = 960
/** Стартова якість; для вже стиснутих JPG знижується, щоб WebP не був більшим за оригінал. */
const WEBP_QUALITY_START = 82
const WEBP_QUALITY_MIN = 72

const exts = /\.(heic|heif|jpg|jpeg|png)$/i

function numFromName(file) {
	const m = file.match(/peaks-(\d+)/i) ?? file.match(/(\d+)/)
	return m ? parseInt(m[1], 10) : null
}

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

function writeWebp(buffer, outPath) {
	try {
		fs.writeFileSync(outPath, buffer)
		return
	} catch {
		const optPath = outPath.replace(/\.webp$/i, '-opt.webp')
		fs.writeFileSync(optPath, buffer)
		try {
			fs.unlinkSync(outPath)
			fs.renameSync(optPath, outPath)
		} catch {
			console.warn('locked:', path.basename(outPath))
		}
	}
}

async function main() {
	if (!fs.existsSync(dir)) {
		console.error('Папку не знайдено:', dir)
		process.exit(1)
	}

	const files = fs
		.readdirSync(dir)
		.filter(f => exts.test(f))
		.filter(f => !f.endsWith('.webp'))

	if (!files.length) {
		console.log('Немає JPG/PNG/HEIC у peaks/.')
		return
	}

	const toProcess = files
		.map(f => ({ f, n: numFromName(f) }))
		.filter(x => x.n != null)
		.sort((a, b) => a.n - b.n)

	for (const { f, n } of toProcess) {
		const inPath = path.join(dir, f)
		const outPath = path.join(dir, `peaks-${n}.webp`)
		const before = fs.statSync(inPath).size
		try {
			const pipeline = (await inputToSharp(inPath)).rotate().resize(MAX_WIDTH, MAX_HEIGHT, {
				fit: 'inside',
				withoutEnlargement: true,
			})

			let quality = WEBP_QUALITY_START
			let buffer = await pipeline.clone().webp({ quality, effort: 4 }).toBuffer()
			const targetMax = Math.floor(before * 0.95)
			while (buffer.length > targetMax && quality > WEBP_QUALITY_MIN) {
				quality -= 4
				buffer = await pipeline.clone().webp({ quality, effort: 4 }).toBuffer()
			}

			writeWebp(buffer, outPath)
			const after = buffer.length
			const note = after > before ? ' (JPG був дуже стиснутий — WebP трохи більший)' : ''
			console.log(
				'OK',
				f,
				'→',
				`peaks-${n}.webp`,
				`q${quality}`,
				`${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB${note}`
			)
		} catch (e) {
			console.error('Помилка:', f, e.message || e)
			process.exitCode = 1
		}
	}
}

main()
