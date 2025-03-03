import type { IAvailabilityResponse } from '@psycron/api/user/index.types';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaPropsNew {
	availability: IAvailabilityResponse;
	daySelectedFromCalendar: Date;
	mode: IAgendaViewMode;
}

export type IAgendaViewMode = 'view' | 'edit' | 'cancel' | 'book';

export type ISelectedSlot = {
	availabilityDayId: string;
	slot: ISlot;
};
