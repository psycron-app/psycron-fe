import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, List, ListItemText } from '@mui/material';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { Agenda } from '@psycron/components/agenda/Agenda';
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
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import {
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
		if (!availabilityData?.dates?.length) return null;

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const normalizedDates = availabilityData.dates.map((d) => ({
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
	}, [availabilityData?.dates]);

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

	return (
		<PageLayout
			title={t('globals.appointments')}
			isLoading={availabilityDataIsLoading || isUserDetailsLoading}
		>
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
					<Box display='flex' flexDirection='column' px={spacing.mediumSmall}>
						<Box>
							<Agenda daySelectedFromCalendar={currentDay} mode='view' />
						</Box>
					</Box>
				)}
			</Box>
		</PageLayout>
	);
};
