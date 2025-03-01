import type { MouseEventHandler } from 'react';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaSlotProps {
	hoveredHour: string;
	isLastInRow?: boolean;
	isSlotDetailsOpen?: boolean;
	isTherapistView: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
	onMouseEnter?: MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: MouseEventHandler<HTMLDivElement>;
	slot?: ISlot;
}
