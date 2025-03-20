import type {
	ISlot,
	ISlotStatus,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { IAgendaViewMode, ISelectedSlot } from '../../Agenda.types';

export interface IAgendaTableBodyProps {
	consultationDuration: number;
	filteredHoursRange: string[];
	fullWeekAvailability: {
		_id: string;
		date: string;
		slots: ISlot[];
		weekDay: string;
	}[];
	isFetchingNextPage: boolean;
	isFetchingPreviousPage: boolean;
	isLoading: boolean;
	mode: IAgendaViewMode;
	nextCursor: string | undefined;
	onClick: (selectedSlotDetails: ISelectedSlot, mode: IAgendaViewMode) => void;
	previousCursor: string | undefined;
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
