import type { IAvailabilityDate } from '@psycron/api/user/index.types';
import type { Locale } from 'date-fns';

export interface ICalendarSection {
	dates: IAvailabilityDate[];
	dayClick: (day: Date) => void;
	locale: Locale;
	today: Date;
}
