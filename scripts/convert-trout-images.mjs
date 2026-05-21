/**
 * Конвертує PNG/HEIC/JPEG у WebP і стискає WebP у public/images/trout.
 * Галерея /trout - картки та слайди до ~1200px по довшій стороні.
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
const dir = path.join(root, 'public', 'images', 'trout')

const MAX_WIDTH = 1200
const MAX_HEIGHT = 900
const WEBP_QUALITY = 82

const INPUT_EXTS = /\.(heic|heif|jpg|jpeg|png)$/i
const WEBP_RE = /\.webp$/i

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

async function encodeOptimizedWebp(pipeline) {
	return pipeline
		.rotate()
		.resize(MAX_WIDTH, MAX_HEIGHT, {
			fit: 'inside',
			withoutEnlargement: true,
		})
		.webp({ quality: WEBP_QUALITY, effort: 4 })
		.toBuffer()
}

function writeOptimizedWebp(buffer, outPath) {
	try {
		fs.writeFileSync(outPath, buffer)
		return
	} catch {
		/* файл зайнятий dev-сервером */
	}
	const optPath = outPath.replace(/\.webp$/i, '-opt.webp')
	fs.writeFileSync(optPath, buffer)
	try {
		fs.unlinkSync(outPath)
		fs.renameSync(optPath, outPath)
	} catch {
		console.warn('locked:', path.basename(outPath), '(optimized as', path.basename(optPath) + ')')
	}
}

function formatKb(bytes) {
	return `${(bytes / 1024).toFixed(1)} KB`
}

async function main() {
	if (!fs.existsSync(dir)) {
		console.error('Папку не знайдено:', dir)
		process.exit(1)
	}

	const files = fs.readdirSync(dir)

	for (const f of files) {
		if (!INPUT_EXTS.test(f)) continue
		const inPath = path.join(dir, f)
		const base = path.basename(f, path.extname(f))
		const outPath = path.join(dir, `${base}.webp`)
		const before = fs.statSync(inPath).size
		const pipeline = await inputToSharp(inPath)
		const buffer = await encodeOptimizedWebp(pipeline)
		writeOptimizedWebp(buffer, outPath)
		const after = fs.statSync(outPath).size
		console.log('convert', f, '→', path.basename(outPath), formatKb(before), '→', formatKb(after))
		if (path.resolve(inPath) !== path.resolve(outPath)) {
			fs.unlinkSync(inPath)
		}
	}

	for (const f of files) {
		if (!WEBP_RE.test(f) || f.endsWith('-opt.webp')) continue
		const inPath = path.join(dir, f)
		const before = fs.statSync(inPath).size
		const buffer = await encodeOptimizedWebp(sharp(inPath))
		writeOptimizedWebp(buffer, inPath)
		const after = fs.statSync(inPath).size
		if (before !== after) {
			console.log('optimize', f, formatKb(before), '→', formatKb(after))
		}
	}

	const trout6 = path.join(dir, 'trout-6.webp')
	if (fs.existsSync(trout6)) {
		fs.unlinkSync(trout6)
		console.log('removed trout-6.webp')
	}

	for (const f of fs.readdirSync(dir)) {
		if (f.endsWith('.webp.tmp')) {
			fs.unlinkSync(path.join(dir, f))
			console.log('removed stale', f)
		}
	}
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
