import type { AppointmentDetailsBySlotIdResponse } from '@psycron/api/user/availability/index.types';

export interface IAgendaAppointmentDetails {
	appointmentDetails: AppointmentDetailsBySlotIdResponse;
	handleEditAppointment: (oldSessionSlotId: string, slotId: string) => void;
}
