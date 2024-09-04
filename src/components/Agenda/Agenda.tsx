import { generateDayHours } from '@psycron/utils/variables';

import { TimeSlots } from './components/TimeSlots/TimeSlots';
import { WeekDays } from './components/WeekDays/WeekDays';
import { Grid } from './Agenda.styles';
import type { IAgenda } from './Agenda.types';

export const Agenda = ({ selectedWeek }: IAgenda) => {
	const dayHours = generateDayHours();

	return (
		<Grid>
			<TimeSlots dayHours={dayHours} />
			<WeekDays dayHours={dayHours} selectedWeek={selectedWeek} />
		</Grid>
	);
};
