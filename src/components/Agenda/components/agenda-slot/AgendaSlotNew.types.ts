import type { MouseEventHandler } from 'react';
import type {
	ISlot,
	ISlotStatus,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaSlotProps {
	isHighlightedColumn: boolean;
	isHighlightedRow: boolean;
	isLastInColumn?: boolean;
	isLastInRow?: boolean;
	isSlotDetailsOpen?: boolean;
	isTherapistView: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
	onMouseEnter?: MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: MouseEventHandler<HTMLDivElement>;
	slot?: ISlot;
}

export type IAgendaSlotStyledProps = {
	isHighlightedColumn?: boolean;
	isHighlightedRow?: boolean;
	isLastInColumn: boolean;
	isLastInRow: boolean;
	status?: ISlotStatus;
};
