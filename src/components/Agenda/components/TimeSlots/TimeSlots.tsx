import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';

import { TimeSlot, TimeSlotWrapper } from './TimeSlots.styles';
import type { ITimeSlots } from './TimeSlots.types';

export const TimeSlots = ({ dayHours, isSimple }: ITimeSlots) => {
	return (
		<Box display='flex' flexDirection='column'>
			<Box height={isSimple ? '3.75rem' : '1.875rem'} />
			{dayHours.map((hour, index) => (
				<TimeSlotWrapper key={`hour-${index}`}>
					<TimeSlot isSimple={isSimple}>
						<Text variant='body2'>{hour}</Text>
					</TimeSlot>
				</TimeSlotWrapper>
			))}
		</Box>
	);
};
