import { createContext, useContext, useState } from 'react';
import { cancelAppointment } from '@psycron/api/appointment';
import type { ICancelAppointment } from '@psycron/api/appointment/index.types';
import type { CustomError } from '@psycron/api/error';
import { useAlert } from '@psycron/context/alert/AlertContext';
import type { ISessionDate } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { useMutation } from '@tanstack/react-query';

import type {
	AppointmentActionsProviderProps,
	IAppointmentActionsContext,
} from './AppointmentActionsContext.types';

const AppointmentActionsContext = createContext<
	IAppointmentActionsContext | undefined
>(undefined);

export const AppointmentActionsProvider = ({
	children,
}: AppointmentActionsProviderProps) => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openCancelModal, setOpenCancelModal] = useState(false);
	const [selectedSession, setSelectedSession] = useState(null);

	const { showAlert } = useAlert();

	const handleEditClick = (session: ISessionDate) => {
		setSelectedSession(session);
		setOpenEditModal(true);
	};

	const handleCancelClick = (session: ISessionDate) => {
		setSelectedSession(session);
		setOpenCancelModal(true);
	};

	const closeModals = () => {
		setOpenEditModal(false);
		setOpenCancelModal(false);
		setSelectedSession(null);
	};

	const cancelAppointmentMutation = useMutation({
		mutationFn: cancelAppointment,
		onSuccess: (data) => {
			showAlert({
				severity: 'success',
				message: data.message,
			});
		},
		onError: (error: CustomError) => {
			showAlert({
				severity: 'error',
				message: error.message,
			});
		},
	});

	const cancelAppointmentMttn = (data: ICancelAppointment) => {
		cancelAppointmentMutation.mutate(data);
	};

	return (
		<AppointmentActionsContext.Provider
			value={{
				openEditModal,
				openCancelModal,
				selectedSession,
				handleEditClick,
				handleCancelClick,
				closeModals,
				cancelAppointmentMttn,
			}}
		>
			{children}
		</AppointmentActionsContext.Provider>
	);
};

export const useAppointmentActions = (): IAppointmentActionsContext => {
	const context = useContext(AppointmentActionsContext);
	if (!context) {
		throw new Error(
			'useAppointmentActions deve ser usado dentro de um AppointmentActionsProvider'
		);
	}

	return context;
};
