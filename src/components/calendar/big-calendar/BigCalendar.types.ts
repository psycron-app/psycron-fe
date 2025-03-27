import type { IDateInfo } from '@psycron/api/user/index.types';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IBigCalendarProps {
	daySelectedFromCalendar: IDateInfo;
	mode: IBigCalendarView;
}

export type IBigCalendarView = 'view' | 'edit' | 'cancel' | 'book';

export type ISelectedSlot = {
	availabilityDayId: string;
	date: Date;
	patientId?: string;
	slot: ISlot;
	therapistId?: string;
};
