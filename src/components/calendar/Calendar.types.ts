import type { Locale } from 'date-fns';

export interface ICalendarProps {
	dateLocale: Locale;
	filteredDates?: Date[];
	handleDayClick?: (day: Date) => void;
	isBig?: boolean;
	isEditing?: boolean;
	selectAllRemaining?: boolean;
	today: Date;
}
