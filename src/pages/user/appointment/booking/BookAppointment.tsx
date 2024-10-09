import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { SEOProvider } from '@psycron/context/seo/SEOContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { DOMAIN } from '@psycron/pages/urls';
import { palette } from '@psycron/theme/palette/palette.theme';
import { startOfToday } from 'date-fns';

export const BookAppointment = () => {
	const { t } = useTranslation();

	const { locale, userId } = useParams<{ locale: string; userId: string }>();

	const {
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		userDetails,
		isUserDetailsLoading,
	} = useUserDetails(userId);

	const today = startOfToday();

	const pageUrl = `${DOMAIN}/${locale}/${userId}/book-appointment`;
	const imageUrl = `${DOMAIN}/empty-appointments.png`;

	const pageTitle = t('page.book-appointment.title', {
		therapisName: userDetails?.firstName,
	});

	const homepageSEO = {
		title: pageTitle,
		description: t('page.book-appointment.description'),
		canonicalUrl: pageUrl,
		ogTitle: t('page.landing.seo.ogTitle'),
		ogDescription: t('page.landing.seo.ogDescription'),
		ogUrl: pageUrl,
		ogType: 'website',
		ogImage: imageUrl,
		twitterCard: 'summary_large_image',
		twitterTitle: t('page.landing.seo.ogTitle'),
		twitterDescription: t('page.landing.seo.ogDescription'),
		twitterImage: imageUrl,
	};

	if (isUserDetailsLoading || therapistLatestAvailabilityLoading) {
		<Loader />;
	}

	return (
		<SEOProvider seo={homepageSEO}>
			<Box bgcolor={palette.background.default} py={10} px={5}>
				<Box>
					<Text>{pageTitle}</Text>
				</Box>
				<Agenda
					selectedDay={today}
					availability={therapistLatestAvailability}
					isLoading={therapistLatestAvailabilityLoading || isUserDetailsLoading}
				/>
			</Box>
		</SEOProvider>
	);
};
