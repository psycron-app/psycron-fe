import type { ReactNode } from 'react';
import type { ICancelAppointment } from '@psycron/api/appointment/index.types';
import type { ISessionDate } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAppointmentActionsContext {
	cancelAppointmentMttn: (data: ICancelAppointment) => void;
	closeModals: () => void;
	handleCancelClick: (session: ISessionDate) => void;
	handleEditClick: (session: ISessionDate) => void;
	openCancelModal: boolean;
	openEditModal: boolean;
	selectedSession: ISessionDate;
}

export interface AppointmentActionsProviderProps {
	children: ReactNode;
}
