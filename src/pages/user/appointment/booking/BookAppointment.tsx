import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { BigCalendar } from '@psycron/components/calendar/big-calendar/BigCalendar';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useAppointmentParams } from '@psycron/hooks/useAppointmentParams';
import { format, parseISO } from 'date-fns';

import {
	BookingAppointmentTitle,
	BookingAppointmentTitleWrapper,
	StyledBookAppointmentPgWrapper,
	StyledBookingAgendaWrapper,
} from './BookAppointment.styles';

export const BookAppointment = () => {
	const { t } = useTranslation();

	const titleRef = useRef<HTMLDivElement | null>(null);

	const {
		// locale,
		userId: therapistId,
		selectedDate,
		selectedSlotId,
		mode,
	} = useAppointmentParams();

	const { userDetails, isUserDetailsLoading } = useUserDetails(therapistId);

	const {
		availabilityData,
		availabilityDataIsLoading,
		publicSlotDetails,
		publicSlotDetailsIsLoading,
	} = useAvailability(undefined, undefined, selectedSlotId);

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
				dateId: (fallbackDay as IDateInfo)?.dateId || fallbackDay._id,
			};
		}

		return null;
	}, [availabilityData]);

	// const pageUrl = `${DOMAIN}/${locale}/${therapistId}/book-appointment`;
	// const imageUrl = `${DOMAIN}/empty-appointments.png`;

	const pageTitle = t('page.book-appointment.title', {
		therapisName: userDetails?.firstName,
	});

	// const homepageSEO = {
	// 	title: pageTitle,
	// 	description: t('page.book-appointment.description'),
	// 	canonicalUrl: pageUrl,
	// 	ogTitle: t('page.landing.seo.ogTitle'),
	// 	ogDescription: t('page.landing.seo.ogDescription'),
	// 	ogUrl: pageUrl,
	// 	ogType: 'website',
	// 	ogImage: imageUrl,
	// 	twitterCard: 'summary_large_image',
	// 	twitterTitle: t('page.landing.seo.ogTitle'),
	// 	twitterDescription: t('page.landing.seo.ogDescription'),
	// 	twitterImage: imageUrl,
	// };

	if (
		isUserDetailsLoading ||
		!therapistId ||
		availabilityDataIsLoading ||
		publicSlotDetailsIsLoading ||
		!availabilityData?.dates?.length ||
		!currentDay
	) {
		return <Loader />;
	}

	const slotInfoText = () => {
		if (mode !== 'edit' || !selectedDate || !selectedSlotId) return null;

		const formattedDate = format(parseISO(selectedDate), 'EEEE, MMMM do');

		return t('page.book-appointment.edit-appointment-title', {
			date: formattedDate,
			startTime: publicSlotDetails?.startTime,
		});
	};

	return (
		<>
			<StyledBookAppointmentPgWrapper>
				<BookingAppointmentTitleWrapper ref={titleRef}>
					<BookingAppointmentTitle>{pageTitle}</BookingAppointmentTitle>
					{mode === 'edit' ? <Text>{slotInfoText()}</Text> : null}
				</BookingAppointmentTitleWrapper>
				<StyledBookingAgendaWrapper>
					<BigCalendar daySelectedFromCalendar={currentDay} mode={mode} />
				</StyledBookingAgendaWrapper>
			</StyledBookAppointmentPgWrapper>
		</>
	);
};
