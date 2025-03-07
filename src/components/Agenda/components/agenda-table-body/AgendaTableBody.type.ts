import type {
	ISlot,
	ISlotStatus,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { IAgendaViewMode } from '../../AgendaNew.types';

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
