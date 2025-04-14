import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { TimeSlotsRow } from '@psycron/components/agenda/components/time-slots/TimeSlotRow';
import { WeekDaysHeader } from '@psycron/components/agenda/components/week-days/WeekDaysHeader';
import { Loader } from '@psycron/components/loader/Loader';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { generateTimeSlots } from '@psycron/utils/variables';

import {
	StyledIAvailabilityGrid,
	StyledIAvailabilityHoursBoxWrapper,
} from './AvailabilityHours.styles';

export const AvailabilityHours = () => {
	const { t } = useTranslation();
	const { latestSessionId, sessionDataIsLoading, sessionData } =
		useUserDetails();

	if (sessionDataIsLoading) {
		return <Loader />;
	}

	if (!latestSessionId) {
		return <Box p={5}>{t('page.availability.wizard.hours.no-session')}</Box>;
	}

	const { consultationDuration, weekdays } = sessionData;
	console.log('🚀 ~ AvailabilityHours ~ weekdays:', weekdays);

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
