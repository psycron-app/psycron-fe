export interface IAgendaAppointmentDetails {
	handleEditAppointment: (oldSessionSlotId: string) => void;
	selectedSlotId: string | null;
}
