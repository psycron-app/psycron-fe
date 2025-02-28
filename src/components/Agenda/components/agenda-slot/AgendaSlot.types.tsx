import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaSlot {
	beforeToday: boolean;
	clickedSlot: string | null;
	day: Date;
	handleSlotClick: () => void;
	hour: string;
	isFirstSlot?: boolean;
	isLastSlot?: boolean;
	isSelectedDay?: boolean;
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

export type StyledGridSlotsProps = {
	isBeforeToday: boolean;
	isFirstSlot: boolean;
	isLastSlot: boolean;
	isSelectedDay: boolean;
	isTherapist: boolean;
	status: StyledAgendaStatusProps;
};
