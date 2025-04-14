import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, List, ListItemText } from '@mui/material';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { BigCalendar } from '@psycron/components/calendar/big-calendar/BigCalendar';
import {
	CalendarOff,
	CalendarRange,
	Play,
	Watch,
} from '@psycron/components/icons';
import { NavigateLink } from '@psycron/components/link/navigate/NavigateLink';
import { Text } from '@psycron/components/text/Text';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';
import { AVAILABILITYWIZARD } from '@psycron/pages/urls';

import {
	CalendarWrapper,
	ListItemTitleWrapper,
	ListWrapper,
	StyledListItem,
	StyledListItemIcon,
	StyledProceedContainer,
} from './Appointment.styles';

export const AppointmentPage = () => {
	const { t } = useTranslation();

	const { isUserDetailsLoading } = useUserDetails();

	const {
		availabilityData,
		isAvailabilityDatesEmpty,
		availabilityDataIsLoading,
	} = useAvailability();

	const currentDay = useMemo(() => {
		if (!availabilityData) return null;

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		console.log('🚀 ~ currentDay ~ today:', today);

		const normalizedDates = availabilityData?.dates?.map((d) => ({
			...d,
			dateObj: new Date(d.date),
		}));
		// console.log('🚀 ~ normalizedDates ~ normalizedDates:', normalizedDates);

		const todayMatch = normalizedDates.find((d) => {
			const date = new Date(d.date);
			date.setHours(0, 0, 0, 0);
			console.log('🚀 ~ todayMatch ~ date:', date);
			return date.getTime() === today.getTime();
		});
		console.log('🚀 ~ todayMatch ~ todayMatch:', todayMatch);

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

	const availabilityGuideItems = [
		{
			title: t('page.appointment-list.guide.step1.title'),
			description: t('page.appointment-list.guide.step1.description'),
			icon: <Play />,
		},
		{
			title: t('page.appointment-list.guide.step2.title'),
			description: t('page.appointment-list.guide.step2.description'),
			icon: <CalendarOff />,
		},
		{
			title: t('page.appointment-list.guide.step3.title'),
			description: t('page.appointment-list.guide.step3.description'),
			icon: <Watch />,
		},
		{
			title: t('page.appointment-list.guide.step4.title'),
			description: t('page.appointment-list.guide.step4.description'),
			icon: <CalendarRange />,
		},
	];

	const loadingState = useMemo(() => {
		return (
			isUserDetailsLoading ||
			availabilityDataIsLoading ||
			!availabilityData?.dates?.length ||
			!currentDay
		);
	}, [
		availabilityData?.dates?.length,
		availabilityDataIsLoading,
		currentDay,
		isUserDetailsLoading,
	]);

	return (
		<PageLayout title={t('globals.appointments')} isLoading={loadingState}>
			<Box height={'100%'} position={'relative'}>
				{isAvailabilityDatesEmpty ? (
					<>
						<Box>
							<Text textAlign={'left'}>
								{t('page.appointment-list.description')}
							</Text>
						</Box>
						<ListWrapper>
							<List>
								{availabilityGuideItems.map(
									({ title, description, icon }, index) => (
										<StyledListItem key={index}>
											<ListItemTitleWrapper>
												<StyledListItemIcon>{icon}</StyledListItemIcon>
												<Text fontWeight={600}>{title}</Text>
											</ListItemTitleWrapper>
											<ListItemText>{description}</ListItemText>
										</StyledListItem>
									)
								)}
							</List>
						</ListWrapper>
						<StyledProceedContainer>
							<NavigateLink isBack={false} nextPage={AVAILABILITYWIZARD} />
						</StyledProceedContainer>
					</>
				) : (
					<CalendarWrapper>
						<Box>
							<BigCalendar daySelectedFromCalendar={currentDay} mode='view' />
						</Box>
					</CalendarWrapper>
				)}
			</Box>
		</PageLayout>
	);
};
