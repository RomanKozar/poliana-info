/**
 * Конвертує HEIC/JPEG/PNG у WebP у public/images/gallery та public/images/accommodation.
 * Вихід: <той самий базовий ім’я>.webp. Файли вже у .webp пропускаються.
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

const INPUT_EXTS = /\.(heic|heif|jpg|jpeg|png)$/i

const DIRS = [
	path.join(root, 'public', 'images', 'gallery'),
	path.join(root, 'public', 'images', 'accommodation'),
]

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

async function convertFile(dir, file) {
	const inPath = path.join(dir, file)
	const base = path.basename(file, path.extname(file))
	const outPath = path.join(dir, `${base}.webp`)

	if (path.resolve(inPath) === path.resolve(outPath)) return

	try {
		const pipeline = await inputToSharp(inPath)
		await pipeline.rotate().webp({ quality: 85, effort: 4 }).toFile(outPath)
		console.log('OK', path.relative(root, inPath), '→', path.basename(outPath))
		fs.unlinkSync(inPath)
	} catch (e) {
		console.error('Помилка:', inPath, e.message || e)
		throw e
	}
}

async function main() {
	for (const dir of DIRS) {
		if (!fs.existsSync(dir)) {
			console.warn('Пропуск (немає папки):', dir)
			continue
		}
		const files = fs
			.readdirSync(dir)
			.filter(f => INPUT_EXTS.test(f) && !f.toLowerCase().endsWith('.webp'))

		for (const f of files) {
			await convertFile(dir, f)
		}
	}
}

main().catch(() => process.exit(1))
