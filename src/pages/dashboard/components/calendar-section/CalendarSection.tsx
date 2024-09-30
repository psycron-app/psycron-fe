import { Skeleton } from '@mui/material';
import { Calendar } from '@psycron/components/calendar/Calendar';

import type { ICalendarSection } from './CalendarSection.types';

export const CalendarSection = ({
	dates,
	dayClick,
	locale,
	today,
	isLoading,
}: ICalendarSection) => {
	if (isLoading) {
		<Skeleton animation='wave'>
			<Calendar dateLocale={locale} today={today} />
		</Skeleton>;
	}

	return (
		<Calendar
			handleDayClick={dayClick}
			dateLocale={locale}
			today={today}
			availabilityDates={dates}
		/>
	);
};
