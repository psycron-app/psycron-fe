import type { IDateInfo } from '@psycron/api/user/index.types';
import type { Locale } from 'date-fns';

export interface ICalendarProps {
	availabilityDates?: IDateInfo[];
	dateLocale: Locale;
	filteredDates?: Date[];
	handleDayClick?: (day: Date) => void;
	isBig?: boolean;
	selectAllRemaining?: boolean;
	today: Date;
}
