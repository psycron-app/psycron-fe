import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { getAvailabilitySession } from '@psycron/api/user/availability';
import { TimeSlotsRow } from '@psycron/components/agenda/components/time-slots/TimeSlotRow';
import { WeekDaysHeader } from '@psycron/components/agenda/components/week-days/WeekDaysHeader';
import { Loader } from '@psycron/components/loader/Loader';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { generateTimeSlots } from '@psycron/utils/variables';
import { useQuery } from '@tanstack/react-query';

import {
	StyledIAvailabilityGrid,
	StyledIAvailabilityHoursBoxWrapper,
} from './AvailabilityHours.styles';

export const AvailabilityHours = () => {
	const { t } = useTranslation();
	const { userDetails } = useUserDetails();

	const latestSessionId =
		userDetails?.availability?.[userDetails?.availability?.length - 1];

	const { data: sessionData, isLoading } = useQuery({
		queryKey: ['availabilitySession', latestSessionId],
		queryFn: () => getAvailabilitySession(latestSessionId),
		enabled: !!latestSessionId,
		retry: 3,
		retryDelay: 2000,
	});

	if (isLoading) {
		return <Loader />;
	}

	if (!sessionData) {
		return <Box p={5}>{t('page.availability.wizard.hours.no-session')}</Box>;
	}

	const { consultationDuration, weekdays } = sessionData;

	const dayHours = generateTimeSlots(consultationDuration);

	return (
		<StyledIAvailabilityHoursBoxWrapper>
			<StyledIAvailabilityGrid container>
				<WeekDaysHeader isSimple />
				<Grid container spacing={1} columns={8}>
					{dayHours.map((hour, index) => (
						<TimeSlotsRow
							key={`hour-${index}`}
							hour={hour}
							availableWeekdays={weekdays}
							dayHours={dayHours}
							isSimple
						/>
					))}
				</Grid>
			</StyledIAvailabilityGrid>
		</StyledIAvailabilityHoursBoxWrapper>
	);
};
