import type {
	IBookSessionWithLink,
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
