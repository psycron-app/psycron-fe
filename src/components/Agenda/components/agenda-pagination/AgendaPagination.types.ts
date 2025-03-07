import type { IAgendaViewMode } from '../../Agenda.types';

export interface IAgendaPaginationProps {
	disableNext?: boolean;
	disablePrevious?: boolean;
	mode?: IAgendaViewMode;
	onGoToMonthView: () => void;
	onGoToNextWeek: () => void;
	onGoToPreviousWeek: () => void;
	onGoToToday: () => void;
}
