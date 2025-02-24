import type { ReactNode } from 'react';
import type {
	ICancelAppointment,
	IEditAppointment,
} from '@psycron/api/appointment/index.types';
import type { ISessionDate } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAppointmentActionsContext {
	cancelAppointmentMttn: (data: ICancelAppointment) => void;
	closeModals: () => void;
	editAppointmentMttn: (data: IEditAppointment) => void;
	handleCancelClick: (session: ISessionDate) => void;
	handleEditClick: (session: ISessionDate) => void;
	isEditAppointmentLoading: boolean;
	openCancelModal: boolean;
	openEditModal: boolean;
	selectedSession: ISessionDate;
}

export interface AppointmentActionsProviderProps {
	children: ReactNode;
}
