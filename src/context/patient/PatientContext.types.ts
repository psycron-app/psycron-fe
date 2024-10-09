import type { ReactNode } from 'react';
import type { IBookAppointment } from '@psycron/api/patient/index.types';

export interface IPatientContextType {
	bookAppointmentFromLinkMttnIsLoading: boolean;
	bookAppointmentWithLink: (data: IBookAppointment) => void;
}

export interface IPatientProviderProps {
	children: ReactNode;
}
