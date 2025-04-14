import type { IBigCalendarView } from '@psycron/components/calendar/big-calendar/BigCalendar.types';

export interface IBigCalendarPagination {
	disableNext?: boolean;
	disablePrevious?: boolean;
	mode?: IBigCalendarView;
	onGoToMonthView: () => void;
	onGoToNextWeek: () => void;
	onGoToPreviousWeek: () => void;
	onGoToToday: () => void;
}
