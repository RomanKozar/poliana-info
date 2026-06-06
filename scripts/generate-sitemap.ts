import fs from 'fs'
import path from 'path'
import { buildPolyanaSitemapXml, polyanaSitemapUrlCount } from '../lib/sitemap-build'

const out = path.join(process.cwd(), 'public', 'sitemap.xml')
const xml = buildPolyanaSitemapXml()

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, xml, 'utf8')

console.log(`public/sitemap.xml — ${polyanaSitemapUrlCount()} URL`)
