import PromotionsOffersPageContent from '@/components/pages/PromotionsOffersPageContent'
import { PROMOTIONS_PAGE_PATH } from '@/data/promotions-page'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Акції та пропозиції в Поляні — SPA, житло, екскурсії та комбо',
	description:
		'Спецпропозиції курорту Поляна: форель і чани, SPA, готелі, квадроцикли та екскурсії в гори. Дізнайтесь про знижки та зателефонуйте для бронювання.',
	pathname: PROMOTIONS_PAGE_PATH,
	keywords: ['Поляна акції', 'знижки Поляна', 'чан форель', 'Закарпаття туризм'],
})

export default function AktsiiTaPropozitsiiPage() {
	return <PromotionsOffersPageContent />
}
