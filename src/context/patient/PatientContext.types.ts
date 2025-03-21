import type { ReactNode } from 'react';
import type {
	IBookAppointment,
	ICreatePatient,
	IEditPatientDetailsById,
} from '@psycron/api/patient/index.types';

export interface IPatientContextType {
	bookAppointmentFromLinkMttnIsLoading: boolean;
	bookAppointmentWithLink: (data: IBookAppointment) => void;
	createPatientIsLoading: boolean;
	createPatientMttn: (data: ICreatePatient) => void;
	updatePatientDetails: (data: IEditPatientDetailsById) => void;
	updatePatientIsLoading: boolean;
}

export interface IPatientProviderProps {
	children: ReactNode;
}
