import type { Locale } from 'date-fns';

export interface ICalendarProps {
	dateLocale: Locale;
	handleDayClick: (day: Date) => void;
	today: Date;
}
