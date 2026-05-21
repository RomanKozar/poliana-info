/**
 * Конвертує HEIC/JPEG/PNG у WebP і стискає WebP у public/images/kids-camps (+ camp-winter).
 * Картки таборів ~170×160px — вихід до 960×720 (4:3), quality 82.
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

const WEBP_QUALITY = 82

const INPUT_EXTS = /\.(heic|heif|jpg|jpeg|png)$/i
const WEBP_RE = /\.webp$/i

/** Літні картки — fit inside; зимові — crop 4:3 як camp-1…5 (960×720). */
const TARGET_DIRS = [
	{
		dir: path.join(root, 'public', 'images', 'kids-camps'),
		maxWidth: 960,
		maxHeight: 720,
		fit: 'inside',
	},
	{
		dir: path.join(root, 'public', 'images', 'kids-camps', 'camp-winter'),
		maxWidth: 960,
		maxHeight: 720,
		fit: 'cover',
	},
	{
		dir: path.join(root, 'public', 'images', 'kids-camps', 'camp-6'),
		maxWidth: 960,
		maxHeight: 720,
		fit: 'inside',
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

async function encodeOptimizedWebp(pipeline, { maxWidth, maxHeight, fit }) {
	const resizeOpts =
		fit === 'cover'
			? { fit: 'cover', position: sharp.strategy.attention }
			: { fit: 'inside', withoutEnlargement: true }
	return pipeline
		.rotate()
		.resize(maxWidth, maxHeight, resizeOpts)
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

async function processRaster(inPath, outPath, target) {
	const pipeline = await inputToSharp(inPath)
	const buffer = await encodeOptimizedWebp(pipeline, target)
	writeOptimizedWebp(buffer, outPath)
}

async function recompressWebp(inPath, target) {
	const buffer = await encodeOptimizedWebp(sharp(inPath), target)
	writeOptimizedWebp(buffer, inPath)
}

function formatKb(bytes) {
	return `${(bytes / 1024).toFixed(1)} KB`
}

async function processDir(target) {
	const { dir } = target
	if (!fs.existsSync(dir)) {
		console.warn('skip (no dir):', path.relative(root, dir))
		return
	}

	const label = path.relative(root, dir)
	const files = fs.readdirSync(dir)

	for (const f of files) {
		if (!INPUT_EXTS.test(f)) continue
		const inPath = path.join(dir, f)
		const base = path.basename(f, path.extname(f))
		const outPath = path.join(dir, `${base}.webp`)
		const before = fs.statSync(inPath).size
		await processRaster(inPath, outPath, target)
		const after = fs.statSync(outPath).size
		console.log(`[${label}] convert`, f, '→', path.basename(outPath), formatKb(before), '→', formatKb(after))
		if (path.resolve(inPath) !== path.resolve(outPath)) {
			fs.unlinkSync(inPath)
		}
	}

	for (const f of files) {
		if (!WEBP_RE.test(f) || f.endsWith('-opt.webp')) continue
		const inPath = path.join(dir, f)
		const before = fs.statSync(inPath).size
		await recompressWebp(inPath, target)
		const after = fs.statSync(inPath).size
		if (before !== after) {
			console.log(`[${label}] optimize`, f, formatKb(before), '→', formatKb(after))
		}
	}

	for (const f of fs.readdirSync(dir)) {
		if (f.endsWith('.webp.tmp')) {
			fs.unlinkSync(path.join(dir, f))
			console.log(`[${label}] removed stale`, f)
		}
		if (f.endsWith('-opt.webp')) {
			const stale = path.join(dir, f)
			const original = stale.replace(/-opt\.webp$/i, '.webp')
			if (fs.existsSync(original)) {
				fs.unlinkSync(stale)
				console.log(`[${label}] removed stale`, f)
			}
		}
	}
}

async function main() {
	for (const target of TARGET_DIRS) {
		await processDir(target)
	}
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
