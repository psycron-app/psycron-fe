export interface IInitiateAvailabilityResponse {
	sessionId: string;
}

export interface IAvailabilityData {
	consultationDuration?: number;
	step?: number;
	therapistId: string;
	weekdays?: string[];
}

export interface IUpdateAvailabilitySession {
	data: Partial<IAvailabilityData>;
	sessionId: string;
}

export interface ISessionResponse {
	_id: string;
	completed: boolean;
	consultationDuration: number;
	createdAt: Date;
	step: number;
	updatedAt: Date;
	weekdays: IWeekdays[]; // Corrected to the new format
}

export interface IWeekdays {
	dayName: IWeekdaysNames;
	slots: string[];
}

export type IWeekdaysNames =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

export interface ICompleteSessionAvailabilityData {
	recurrencePattern: string;
	selectedSlots: string[];
	sessionId: string;
	timezone: string;
}

export interface ICompleteSessionAvailabilityResponse {
	availability: {
		_id: string;
		availabilityDates: Array<{
			date: string;
			slots: Array<{
				endTime: string;
				note?: string;
				startTime: string;
				status: 'AVAILABLE' | 'BLOCKED' | 'BOOKED';
			}>;
		}>;
		consultationDuration: number;
		createAvailabilitySession: string;
		createdAt: string;
		therapistId: string;
		updatedAt: string;
	};
	status: string;
}

export interface Appointment {
	availabilityId: string;
	dateHour: Date;
	therapistId: string;
}

export interface BookAppointmentResponse {
	message: string;
}
