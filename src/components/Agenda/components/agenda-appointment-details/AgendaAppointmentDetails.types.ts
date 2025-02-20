export interface IAgendaAppointmentDetails {
	isTherapistEditing: boolean;
	selectedSlotId: string | null;
	setIsTherapistEditing?: (value: boolean) => void;
}
