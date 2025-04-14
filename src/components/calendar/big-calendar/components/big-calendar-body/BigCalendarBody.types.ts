import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { IBigCalendarView, ISelectedSlot } from '../../BigCalendar.types';

export interface IBigCalendarBody {
	consultationDuration: number;
	daysOfWeek: Date[];
	filteredHoursRange: string[];
	getSlotsForDayAndHour: (
		day: Date,
		hour: string
	) => {
		dateId: string;
		slots: ISlot[];
	};
	includeHourColumn: boolean;
	isColumnFetching: (
		isFetchingNextPage: boolean,
		isFetchingPreviousPage: boolean,
		nextCursor: string | null,
		previousCursor: string | null,
		day: Date
	) => boolean;
	isFetchingNextPage: boolean;
	isFetchingPreviousPage: boolean;
	isLoading: boolean;
	mode: IBigCalendarView;
	nextCursor: string | undefined;
	onClick: (selectedSlotDetails: ISelectedSlot, mode: IBigCalendarView) => void;
	previousCursor: string | undefined;
	totalColumns: number;
}

export type SlotVisualType = 'BOOKED' | 'AVAILABLE' | 'DISABLED';
