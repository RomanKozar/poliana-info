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

const ACCOMMODATION_SUBDIRS = [
	{ dir: path.join(root, 'public', 'images', 'accommodation', 'kateryna'), maxWidth: 1400, maxHeight: 2000, webpQuality: 85 },
	{
		dir: path.join(root, 'public', 'images', 'accommodation', 'kateryna', 'kateryna-hotel'),
		maxWidth: 1280,
		maxHeight: 1280,
		webpQuality: 78,
	},
	{
		dir: path.join(root, 'public', 'images', 'accommodation', 'kontinent'),
		maxWidth: 1280,
		maxHeight: 1280,
		webpQuality: 78,
	},
	{
		dir: path.join(root, 'public', 'images', 'accommodation', 'river-side'),
		maxWidth: 1280,
		maxHeight: 1280,
		webpQuality: 78,
	},
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

function writeWebpBuffer(buffer, outPath) {
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
			console.warn('locked:', path.basename(outPath), '(left as', path.basename(optPath) + ')')
		}
	}
}

async function convertFile(dir, file, opts = {}) {
	const { maxWidth = null, maxHeight = null, webpQuality = 85 } = opts
	const inPath = path.join(dir, file)
	const base = path.basename(file, path.extname(file))
	const outPath = path.join(dir, `${base}.webp`)

	if (path.resolve(inPath) === path.resolve(outPath)) return

	try {
		let pipeline = await inputToSharp(inPath)
		pipeline = pipeline.rotate()
		if (maxWidth && maxHeight) {
			pipeline = pipeline.resize(maxWidth, maxHeight, {
				fit: 'inside',
				withoutEnlargement: true,
			})
		}
		const buffer = await pipeline.webp({ quality: webpQuality, effort: 4 }).toBuffer()
		writeWebpBuffer(buffer, outPath)
		console.log('OK', path.relative(root, inPath), '→', path.basename(outPath))
		if (path.resolve(inPath) !== path.resolve(outPath)) fs.unlinkSync(inPath)
	} catch (e) {
		console.error('Помилка:', inPath, e.message || e)
		throw e
	}
}

async function recompressWebp(dir, file, opts = {}) {
	const { maxWidth = null, maxHeight = null, webpQuality = 85 } = opts
	const inPath = path.join(dir, file)
	const before = fs.statSync(inPath).size
	let pipeline = sharp(inPath).rotate()
	if (maxWidth && maxHeight) {
		pipeline = pipeline.resize(maxWidth, maxHeight, {
			fit: 'inside',
			withoutEnlargement: true,
		})
	}
	const buffer = await pipeline.webp({ quality: webpQuality, effort: 4 }).toBuffer()
	writeWebpBuffer(buffer, inPath)
	const after = fs.statSync(inPath).size
	if (before !== after) {
		console.log(
			'optimize',
			path.relative(root, inPath),
			`${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`
		)
	}
}

async function processDir(dir, opts) {
	if (!fs.existsSync(dir)) {
		console.warn('Пропуск (немає папки):', dir)
		return
	}
	const files = fs
		.readdirSync(dir)
		.filter(f => INPUT_EXTS.test(f) && !f.toLowerCase().endsWith('.webp'))

	for (const f of files) {
		await convertFile(dir, f, opts)
	}

	for (const f of fs.readdirSync(dir)) {
		if (!/\.webp$/i.test(f) || f.endsWith('-opt.webp')) continue
		await recompressWebp(dir, f, opts)
	}
}

async function main() {
	for (const dir of DIRS) {
		await processDir(dir)
	}
	for (const { dir, ...opts } of ACCOMMODATION_SUBDIRS) {
		await processDir(dir, opts)
	}
}

main().catch(() => process.exit(1))
