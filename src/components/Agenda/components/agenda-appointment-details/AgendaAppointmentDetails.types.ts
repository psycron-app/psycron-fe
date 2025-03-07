import type { ISelectedSlot } from '../../Agenda.types';

export interface IAgendaAppointmentDetails {
	handleEditAppointment: (oldSessionSlotId: string, slotId: string) => void;
	selectedSlot: ISelectedSlot;
}
