/**
 * Конвертує `spa-title-*.png` у `public/images/spa-title/` у WebP і видаляє PNG.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dir = path.join(root, 'public', 'images', 'spa-title')

async function main() {
	const files = fs.readdirSync(dir).filter(f => /^spa-title-\d+\.png$/i.test(f))
	if (files.length === 0) {
		console.warn('no spa-title-*.png in', path.relative(root, dir))
		return
	}
	for (const f of files.sort()) {
		const inPath = path.join(dir, f)
		const outPath = path.join(dir, f.replace(/\.png$/i, '.webp'))
		await sharp(inPath).webp({ quality: 88 }).toFile(outPath)
		fs.unlinkSync(inPath)
		console.warn('converted', path.relative(root, outPath))
	}
}

main().catch(e => {
	console.error(e)
	process.exit(1)
})
