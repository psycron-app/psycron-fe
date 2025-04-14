import type { IDateInfo } from '@psycron/api/user/index.types';
import type { Locale } from 'date-fns';

export interface ICalendarProps {
	availabilityData?: IDateInfo[];
	dateLocale: Locale;
	filteredDates?: Date[];
	firstDate: IDateInfo;
	handleDayClick?: (day: IDateInfo) => void;
	isBig?: boolean;
	lastDate: IDateInfo;
	selectAllRemaining?: boolean;
	today: Date;
}
