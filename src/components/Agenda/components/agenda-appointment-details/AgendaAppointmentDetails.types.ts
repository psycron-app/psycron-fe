import type { ISelectedSlot } from '../../AgendaNew.types';

export interface IAgendaAppointmentDetails {
	handleEditAppointment: (oldSessionSlotId: string, slotId: string) => void;
	selectedSlot: ISelectedSlot;
}
