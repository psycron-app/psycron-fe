import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { SEOProvider } from '@psycron/context/seo/SEOContext';
import { DOMAIN } from '@psycron/pages/urls';

export const BookAppointment = () => {
	const { t } = useTranslation();

	const { locale, id } = useParams<{ id: string; locale: string }>();

	const pageUrl = `${DOMAIN}/${locale}/${id}/book-appointment`;
	const imageUrl = `${DOMAIN}/empty-appointments.png`;

	const homepageSEO = {
		title: t('page.landing.seo.title'),
		description: t('page.landing.seo.description'),
		canonicalUrl: pageUrl, // URL dinâmica
		ogTitle: t('page.landing.seo.ogTitle'),
		ogDescription: t('page.landing.seo.ogDescription'),
		ogUrl: pageUrl, // URL dinâmica
		ogType: 'website',
		ogImage: imageUrl, // Thumbnail da página
		twitterCard: 'summary_large_image',
		twitterTitle: t('page.landing.seo.ogTitle'),
		twitterDescription: t('page.landing.seo.ogDescription'),
		twitterImage: imageUrl, // Mesma imagem do Open Graph
	};

	return (
		<SEOProvider seo={homepageSEO}>
			<Box>
				<Box>Appointment</Box>
			</Box>
		</SEOProvider>
	);
};
