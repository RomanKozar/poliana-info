/**
 * Конвертує PNG ресторану в WebP та видаляє trout-6.webp у public/igames/trout та public/images/trout.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const dirs = [
	path.join(root, 'public', 'igames', 'trout'),
	path.join(root, 'public', 'images', 'trout'),
]

async function main() {
	for (const dir of dirs) {
		const files = fs.readdirSync(dir).filter(f => /^restoran-.*\.png$/i.test(f))
		for (const f of files) {
			const inPath = path.join(dir, f)
			const outPath = path.join(dir, f.replace(/\.png$/i, '.webp'))
			await sharp(inPath).webp({ quality: 86 }).toFile(outPath)
			fs.unlinkSync(inPath)
			console.warn('converted', path.relative(root, outPath))
		}
		const trout6 = path.join(dir, 'trout-6.webp')
		if (fs.existsSync(trout6)) {
			fs.unlinkSync(trout6)
			console.warn('removed', path.relative(root, trout6))
		}
	}
}

main().catch(e => {
	console.error(e)
	process.exit(1)
})
