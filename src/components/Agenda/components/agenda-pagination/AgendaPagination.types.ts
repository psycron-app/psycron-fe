export interface IAgendaPaginationProps {
	disableNext?: boolean;
	disablePrevious?: boolean;
	onGoToMonthView: () => void;
	onGoToNextWeek: () => void;
	onGoToPreviousWeek: () => void;
	onGoToToday: () => void;
}
