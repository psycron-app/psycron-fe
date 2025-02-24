import type { IAvailabilityResponse } from '@psycron/api/user/index.types';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { StyledAgendaStatusProps } from './components/agenda-slot/AgendaSlot.types';

export interface IAgenda {
	availability?: IAvailabilityResponse;
	isBig?: boolean;
	isEditingMode?: boolean;
	isFirstAppointment?: boolean;
	isLoading: boolean;
	isTherapist?: boolean;
	selectedDay: Date;
}

export interface IAgendaClick {
	beforeToday: boolean;
	day: Date;
	hour: string;
	slotStatus: ISlot['status'];
	status: StyledAgendaStatusProps;
}
