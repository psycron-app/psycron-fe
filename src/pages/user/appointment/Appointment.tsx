import { useTranslation } from 'react-i18next';
import { Box, List, ListItemText } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import {
	CalendarOff,
	CalendarRange,
	Play,
	Watch,
} from '@psycron/components/icons';
import { NavigateLink } from '@psycron/components/link/navigate/NavigateLink';
import { Text } from '@psycron/components/text/Text';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useDashboardLogic } from '@psycron/hooks/useDashboardLogic';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';
import { AVAILABILITYWIZARD } from '@psycron/pages/urls';
import { startOfToday } from 'date-fns';

import {
	ListItemTitleWrapper,
	ListWrapper,
	StyledListItem,
	StyledListItemIcon,
	StyledProceedContainer,
} from './Appointment.styles';

export const AppointmentPage = () => {
	const { t } = useTranslation();

	const {
		therapistLatestAvailabilityLoading,
		emptyAvailability,
		isUserDetailsLoading,
	} = useUserDetails();

	const { therapistLatestAvailability } = useDashboardLogic();

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

	const currentDay = startOfToday();

	return (
		<PageLayout
			title={t('globals.appointments')}
			isLoading={therapistLatestAvailabilityLoading || isUserDetailsLoading}
		>
			<Box height={'100%'} position={'relative'}>
				{emptyAvailability ? (
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
					<Box display='flex' flexDirection='column' pt={10}>
						<Box>
							<Agenda
								selectedDay={currentDay}
								availability={therapistLatestAvailability}
								isLoading={therapistLatestAvailabilityLoading}
								isBig
								isTherapist
							/>
						</Box>
					</Box>
				)}
			</Box>
		</PageLayout>
	);
};
