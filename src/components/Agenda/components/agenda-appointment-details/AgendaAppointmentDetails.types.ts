import type { IAgendaEditing } from '../../Agenda.types';

export interface IAgendaAppointmentDetails {
	handleEditAppointment: (oldSessionSlotId: string, slotId: string) => void;
	selectedEditingSlot: IAgendaEditing;
}
