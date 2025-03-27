import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { BigCalendar } from '@psycron/components/calendar/big-calendar/BigCalendar';
import { Loader } from '@psycron/components/loader/Loader';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { SEOProvider } from '@psycron/context/seo/SEOContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { DOMAIN } from '@psycron/pages/urls';

import {
	BookingAppointmentTitle,
	BookingAppointmentTitleWrapper,
	StyledBookAppointmentPgWrapper,
	StyledBookingAgendaWrapper,
} from './BookAppointment.styles';

export const BookAppointment = () => {
	const { t } = useTranslation();

	const titleRef = useRef<HTMLDivElement | null>(null);

	const { locale, userId } = useParams<{
		first?: string;
		locale: string;
		userId: string;
	}>();

	const { availabilityData, availabilityDataIsLoading } = useAvailability();

	const { userDetails, isUserDetailsLoading } = useUserDetails(userId);

	useEffect(() => {
		if (
			!availabilityDataIsLoading &&
			!isUserDetailsLoading &&
			titleRef.current
		) {
			titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [availabilityDataIsLoading, isUserDetailsLoading]);

	const currentDay = useMemo(() => {
		if (!availabilityData) return null;

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const normalizedDates = availabilityData?.dates?.map((d) => ({
			...d,
			dateObj: new Date(d.date),
		}));

		const todayMatch = normalizedDates.find((d) => {
			const date = new Date(d.date);
			date.setHours(0, 0, 0, 0);
			return date.getTime() === today.getTime();
		});

		if (todayMatch) {
			return {
				date: todayMatch.date,
				dateId: (todayMatch as IDateInfo).dateId || todayMatch._id,
			};
		}

		const sortedByProximity = [...normalizedDates].sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});

		const futureDay = sortedByProximity.find((d) => d.dateObj > today);
		const pastDay = [...sortedByProximity]
			.reverse()
			.find((d) => d.dateObj < today);

		const fallbackDay = futureDay || pastDay;

		if (fallbackDay) {
			return {
				date: fallbackDay.date,
				dateId: (todayMatch as IDateInfo).dateId || todayMatch._id,
			};
		}

		return null;
	}, [availabilityData]);

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

	if (
		isUserDetailsLoading ||
		availabilityDataIsLoading ||
		!availabilityData?.dates?.length ||
		!currentDay
	) {
		return <Loader />;
	}

	return (
		<SEOProvider seo={homepageSEO}>
			<StyledBookAppointmentPgWrapper>
				<BookingAppointmentTitleWrapper ref={titleRef}>
					<BookingAppointmentTitle>{pageTitle}</BookingAppointmentTitle>
				</BookingAppointmentTitleWrapper>
				<StyledBookingAgendaWrapper>
					<BigCalendar daySelectedFromCalendar={currentDay} mode='book' />
				</StyledBookingAgendaWrapper>
			</StyledBookAppointmentPgWrapper>
		</SEOProvider>
	);
};
