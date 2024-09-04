import { Grid } from '@psycron/components/agenda/Agenda.styles';
import { TimeSlots } from '@psycron/components/agenda/components/TimeSlots/TimeSlots';
import { WeekDays } from '@psycron/components/agenda/components/WeekDays/WeekDays';
import { palette } from '@psycron/theme/palette/palette.theme';
import { generateTimeSlots } from '@psycron/utils/variables';

export const AvailabilityHours = () => {
	const dayHours = generateTimeSlots(30);

	return (
		<Grid bgcolor={palette.background.default}>
			<TimeSlots dayHours={dayHours} isSimple />
			<WeekDays dayHours={dayHours} isSimple />
		</Grid>
	);
};
