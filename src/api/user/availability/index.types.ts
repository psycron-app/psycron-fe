import type {
	IPatient,
	ISlot,
	ISlotStatus,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

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

export type IDayName =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

export type IWeekdaysNames =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

export interface Appointment {
	availabilityId: string;
	dateHour: Date;
	therapistId: string;
}

export interface BookAppointmentResponse {
	message: string;
}

export interface AppointmentDetailsBySlotIdResponse {
	appointment: {
		date: Date;
		endTime: string;
		patient: Partial<IPatient>;
		startTime: string;
		status: ISlot['status'];
	};
}

export interface ISlotSelection {
	dayName: IDayName;
	slots: string[];
}

export type RecurrencePattern = 'WEEKLY' | 'MONTHLY';

export interface ICompleteSessionAvailabilityData {
	recurrencePattern: RecurrencePattern;
	selectedSlots: ISlotSelection[];
	timezone: string;
}

export enum StatusEnum {
	AVAILABLE = 'AVAILABLE',
	BLOCKED = 'BLOCKED',
	BOOKED = 'BOOKED',
	CANCELLED = 'CANCELLED',
	EMPTY = 'EMPTY',
	ONHOLD = 'ONHOLD',
}

export interface IAvailabilityDate {
	date: string;
	slots: Array<{
		endTime: string;
		note?: string;
		startTime: string;
		status: StatusEnum;
	}>;
}

export interface ICompleteSessionAvailabilityResponse {
	availability: {
		_id: string;
		availabilityDates: IAvailabilityDate[];
		consultationDuration: number;
		createAvailabilitySession: string;
		createdAt: string;
		therapistId: string;
		updatedAt: string;
	};
	status: string;
}

export interface IEditSlotStatus {
	availabilityDayId: string;
	data: IEditSlotStatusData;
	slotId: string | null;
	therapistId: string;
}

export interface IEditSlotStatusData {
	newStatus: ISlotStatus;
	startTime: string;
}
