import { Text } from '@psycron/components/text/Text';
import useViewport from '@psycron/hooks/useViewport';
import { format, isSameDay } from 'date-fns';

import {
	BigCalendarDate,
	BigCalendarHeaderWrapper,
} from './BigCalendarHeader.styles';
import type { IBigCalendarHeader } from './BigCalendarHeader.types';

export const BigCalendarHeader = ({
	totalColumns,
	includeHourColumn,
	daysOfWeek,
	weekDayName,
}: IBigCalendarHeader) => {
	const { isMobile } = useViewport();

	const today = new Date();

	return (
		<BigCalendarHeaderWrapper
			container
			columns={totalColumns}
			columnSpacing={1}
			includeHourColumn={includeHourColumn}
		>
			{includeHourColumn && <Text></Text>}
			{daysOfWeek.map((day) => (
				<BigCalendarDate
					key={day.toISOString()}
					isToday={isSameDay(day, today)}
				>
					{isMobile ? (
						<Text variant='subtitle2' isFirstUpper>
							{weekDayName(day).charAt(0)} {format(day, 'dd')}
						</Text>
					) : (
						<>
							<Text isFirstUpper>{weekDayName(day)}</Text>
							<Text variant='subtitle2'>{format(day, 'dd/MM')}</Text>
						</>
					)}
				</BigCalendarDate>
			))}
		</BigCalendarHeaderWrapper>
	);
};
