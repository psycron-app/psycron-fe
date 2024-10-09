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
