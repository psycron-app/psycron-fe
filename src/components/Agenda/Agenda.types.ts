import type { IDateInfo } from '@psycron/api/user/index.types';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaProps {
	daySelectedFromCalendar: IDateInfo;
	mode: IAgendaViewMode;
}

export type IAgendaViewMode = 'view' | 'edit' | 'cancel' | 'book';

export type ISelectedSlot = {
	availabilityDayId: string;
	date: string;
	slot: ISlot;
};
