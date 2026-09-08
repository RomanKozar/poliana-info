/**
 * Конвертує PNG/JPEG у JPG для банерів головної (public/images/baner/promo*.jpg).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dir = path.join(root, 'public', 'images', 'baner')

const JPEG_QUALITY = 88

const INPUT_EXTS = /\.(jpg|jpeg|png|webp)$/i

/** Джерело → promo1..4.jpg (порядок каруселі на головній). */
const OUT_NAMES = {
	'atracion_vipochinok.jpeg': 'promo1.jpg',
	'atracion-vidpochynok-a.webp': 'promo1.jpg',
	'TUR_5+1.png': 'promo2.jpg',
	'tur-5-plus-1-a.webp': 'promo2.jpg',
	'Summer_5_4.png': 'promo3.jpg',
	'summer-5-4-a.webp': 'promo3.jpg',
	'Day_off.png': 'promo4.jpg',
	'day-off-a.webp': 'promo4.jpg',
}

async function encodeJpeg(inPath, outPath) {
	const before = fs.statSync(inPath).size
	const buffer = await sharp(inPath)
		.rotate()
		.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
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
	const files = fs.readdirSync(dir).filter(f => INPUT_EXTS.test(f) && !/^promo[1-4]\.jpg$/i.test(f))
	if (files.length === 0) {
		console.log('no input images in', dir)
		return
	}
	for (const file of files) {
		const outName = OUT_NAMES[file]
		if (!outName) continue
		await encodeJpeg(path.join(dir, file), path.join(dir, outName))
	}
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
