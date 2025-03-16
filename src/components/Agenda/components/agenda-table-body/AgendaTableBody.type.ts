import type {
	ISlot,
	ISlotStatus,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { IAgendaViewMode, ISelectedSlot } from '../../Agenda.types';

export interface IAgendaTableBodyProps {
	filteredHoursRange: string[];
	fullWeekAvailability: {
		_id: string;
		date: string;
		slots: ISlot[];
		weekDay: string;
	}[];
	isLoading: boolean;
	mode: IAgendaViewMode;
	onClick: (selectedSlotDetails: ISelectedSlot, mode: IAgendaViewMode) => void;
}

export type IAgendaTableBodyStyledProps = {
	isHighlightedColumn?: boolean;
	isHighlightedRow?: boolean;
	isLastInColumn?: boolean;
	isLastInRow?: boolean;
	isLoading?: boolean;
	status?: ISlotStatus;
};

export type IAgendaSlotStyledProps = {
	isHighlightedColumn?: boolean;
	isHighlightedRow?: boolean;
	isLastInColumn: boolean;
	isLastInRow: boolean;
	status?: ISlotStatus;
};
