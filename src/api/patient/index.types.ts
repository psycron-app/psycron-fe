import type {
	IBookSessionWithLink,
	IContactInfo,
	IPatient,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { IResponse } from '../user/index.types';

export interface IBookAppointment {
	data: IBookSessionWithLink;
	therapistId: string;
}

export interface IBookAppointmentResponse extends IResponse {
	appointmentInfo: string;
	patient: IPatient;
}

export interface IPatientByIdResponse {
	user: IPatient;
}

export interface PatientFormData {
	_id?: string;
	countryCode?: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	whatsapp: string;
}
export interface IEditPatientDetailsById {
	patient: PatientFormData;
	patientId: string;
}

export interface IEditPatientDetailsByIdResponse {
	message: string;
	patient: PatientFormData;
	status: string;
}

export interface PatientPartial {
	contacts: IContactInfo;
	firstName: string;
	lastName: string;
}

export interface ICreatePatient {
	availabilityDayId: string;
	patient: PatientPartial;
	slotId: string;
	therapistId: string;
}

export interface ICreatePatientResponse {
	message: string;
	patient: IPatient;
	status: 'success' | 'error';
}
