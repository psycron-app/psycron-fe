import type { IAvailabilityDate } from '@psycron/api/user/index.types';
import type { Locale } from 'date-fns';

export interface ICalendarProps {
	availabilityDates?: IAvailabilityDate[];
	dateLocale: Locale;
	filteredDates?: Date[];
	handleDayClick?: (day: Date) => void;
	isBig?: boolean;
	selectAllRemaining?: boolean;
	today: Date;
}
