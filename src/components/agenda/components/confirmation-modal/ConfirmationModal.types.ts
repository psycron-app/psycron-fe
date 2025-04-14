export interface IConfirmationModal {
	availabilityId: string;
	handleCancelConfirmation: () => void;
	openConfirmationModal: boolean;
	selectedSlot: Date | null;
	therapistId: string;
}
