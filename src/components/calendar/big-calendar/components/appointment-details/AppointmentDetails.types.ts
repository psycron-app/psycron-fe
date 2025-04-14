import type { ISelectedSlot } from '@psycron/components/calendar/big-calendar/BigCalendar.types';

export interface IAppointmentDetails {
	appointmentDetails: ISelectedSlot;
	handleEditAppointment: (selectedSlot: ISelectedSlot) => void;
	isEditingStatus: boolean;
}
