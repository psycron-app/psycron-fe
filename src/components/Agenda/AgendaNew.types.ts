import type { ReactElement } from 'react';
import type { IAvailabilityResponse } from '@psycron/api/user/index.types';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { StyledAgendaStatusProps } from './components/agenda-slot/AgendaSlot.types';

export interface IAgendaNew {
	availability?: IAvailabilityResponse;
	clickedSlot: string;
	handleBookAppointment: (
		props: Pick<IAgendaClickNew, 'day' | 'hour' | 'status'>
	) => void;
	handleTherapistClick: (
		props: Pick<IAgendaClickNew, 'day' | 'hour' | 'status' | 'slotStatus'>
	) => void;
	isBig?: boolean;
	isClicked: boolean;
	isEditingMode?: boolean;
	isFirstAppointment?: boolean;
	isLoading: boolean;
	isTherapist?: boolean;
	modal?: ReactElement;
	selectedDay: Date;
}

export interface IAgendaClickNew {
	beforeToday: boolean;
	day: Date;
	hour: string;
	slotStatus: ISlot['status'];
	status: StyledAgendaStatusProps;
}
