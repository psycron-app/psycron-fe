export interface IAgendaPaginationProps {
	disableNext?: boolean;
	disablePrevious?: boolean;
	isTherapist?: boolean;
	onGoToMonthView: () => void;
	onGoToNextWeek: () => void;
	onGoToPreviousWeek: () => void;
	onGoToToday: () => void;
}
