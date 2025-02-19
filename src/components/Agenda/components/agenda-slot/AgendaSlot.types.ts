import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaSlot {
	beforeToday: boolean;
	clickedSlot: string | null;
	day: Date;
	handleSlotClick: () => void;
	hour: string;
	isTherapist?: boolean;
	slotStatus: ISlot['status'];
	status: StyledAgendaStatusProps;
}

export type StyledAgendaStatusProps =
	| 'available'
	| 'booked'
	| 'beforeToday'
	| 'selected'
	| 'clicked'
	| 'default'
	| 'empty'
	| 'unavailable';
