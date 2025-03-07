import type { IAgendaViewMode } from '../../AgendaNew.types';

export interface IAgendaPaginationProps {
	disableNext?: boolean;
	disablePrevious?: boolean;
	mode?: IAgendaViewMode;
	onGoToMonthView: () => void;
	onGoToNextWeek: () => void;
	onGoToPreviousWeek: () => void;
	onGoToToday: () => void;
}
