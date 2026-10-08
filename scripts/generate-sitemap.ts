/**
 * Локальна перевірка XML (основна карта — `app/sitemap.xml/route.ts`).
 * Запуск: npx tsx scripts/generate-sitemap.ts
 */
import { buildPolyanaSitemapXml, polyanaSitemapUrlCount } from '../lib/sitemap-build'

console.log(`Sitemap URL count: ${polyanaSitemapUrlCount()}`)
console.log(buildPolyanaSitemapXml().slice(0, 400) + '…')
