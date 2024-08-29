import { Box } from '@mui/material';
import { format, isToday, setHours, startOfDay } from 'date-fns';

import { Text } from '../text/Text';

import {
	AgendaTopRow,
	AgendaTopRowItem,
	Grid,
	Slot,
	TimeSlot,
	TimeSlotWrapper,
} from './Agenda.styles';
import type { IAgenda } from './Agenda.types';

export const Agenda = ({ selectedWeek }: IAgenda) => {
	const generateDayHours = () => {
		const hours = Array.from({ length: 24 }).map((_, index) => {
			return format(setHours(startOfDay(new Date()), index), 'HH:mm');
		});
		return hours;
	};

	const dayHours = generateDayHours();

	return (
		<Grid>
			<Box display='flex' flexDirection='column'>
				<Box height='60px' />
				{dayHours.map((hour, index) => (
					<TimeSlotWrapper key={`hour-${index}`}>
						<TimeSlot>
							<Text variant='body2'>{hour}</Text>
						</TimeSlot>
					</TimeSlotWrapper>
				))}
			</Box>
			{selectedWeek.map((day, dayIndex) => {
				const isCurrentDay = isToday(day);
				return (
					<AgendaTopRowItem key={`day-${dayIndex}`} isCurrentDay={isCurrentDay}>
						<AgendaTopRow>
							<Text>{format(day, 'EE')}</Text>
							<Text>{format(day, 'd')}</Text>
						</AgendaTopRow>
						{dayHours.map((_, hourIndex) => (
							<Slot key={`slot-${dayIndex}-${hourIndex}`} />
						))}
					</AgendaTopRowItem>
				);
			})}
		</Grid>
	);
};
