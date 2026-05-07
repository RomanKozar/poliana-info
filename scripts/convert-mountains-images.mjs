/**
 * Готує зображення для карток «Екскурсії в гори».
 * Конвертація: JPG/JPEG/PNG/HEIC → WebP + resize/crop до 4:3 (1200×900).
 *
 * Вхід:  public/images/excursions/mountains/*
 * Вихід: public/images/excursions/mountains/mountains-<n>.webp
 *
 * Оригінали НЕ видаляємо (щоб не втратити джерела).
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
const dir = path.join(root, 'public', 'images', 'excursions', 'mountains')

const exts = /\.(heic|heif|jpg|jpeg|png)$/i

function numFromName(file) {
	const m = file.match(/mountains-(\d+)/i) ?? file.match(/(\d+)/)
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
		console.log('Немає файлів для конвертації (HEIC/JPG/PNG).')
		return
	}

	const withNum = files
		.map(f => ({ f, n: numFromName(f) }))
		.filter(x => x.n != null)
		.sort((a, b) => a.n - b.n)

	const toProcess = withNum.length ? withNum : files.map((f, i) => ({ f, n: i + 1 }))

	for (const { f, n } of toProcess) {
		const inPath = path.join(dir, f)
		const outName = `mountains-${n}.webp`
		const outPath = path.join(dir, outName)

		try {
			const pipeline = await inputToSharp(inPath)
			await pipeline
				.rotate()
				.resize(1200, 900, {
					fit: 'cover',
					position: sharp.strategy.attention,
				})
				.webp({ quality: 84, effort: 4 })
				.toFile(outPath)
			console.log('OK', f, '→', outName)
		} catch (e) {
			console.error('Помилка:', f, e.message || e)
			process.exitCode = 1
		}
	}
}

main()

