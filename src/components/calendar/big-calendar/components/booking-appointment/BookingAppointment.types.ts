import type { ISelectedSlot } from '../../BigCalendar.types';

export interface IBookingAppointment {
	selectedSlot: ISelectedSlot;
}

export interface IBookingAppointmentRef {
	submitForm: () => void;
}
