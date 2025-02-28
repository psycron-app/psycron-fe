import { Calendar } from '@psycron/components/calendar/Calendar';

import type { ICalendarSection } from './CalendarSection.types';

export const CalendarSection = ({
	dates,
	dayClick,
	locale,
	today,
}: ICalendarSection) => {
	return (
		<Calendar
			handleDayClick={dayClick}
			dateLocale={locale}
			today={today}
			availabilityDates={dates}
		/>
	);
};
