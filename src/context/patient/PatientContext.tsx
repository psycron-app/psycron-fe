import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CustomError } from '@psycron/api/error';
import {
	bookAppointmentFromLink,
	getPatientById,
	updatePatientDetailsById,
} from '@psycron/api/patient';
import type {
	IBookAppointment,
	IEditPatientDetailsById,
} from '@psycron/api/patient/index.types';
import i18n from '@psycron/i18n';
import { APPOINTMENTCONFIRMATION } from '@psycron/pages/urls';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '../alert/AlertContext';
import type { IPatient } from '../user/auth/UserAuthenticationContext.types';

import type {
	IPatientContextType,
	IPatientProviderProps,
} from './PatientContext.types';

const PatientContext = createContext<IPatientContextType | undefined>(
	undefined
);

export const PatientProvider = ({ children }: IPatientProviderProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { showAlert } = useAlert();

	const bookAppointmentFromLinkMutation = useMutation({
		mutationFn: bookAppointmentFromLink,
		onSuccess: (data) => {
			navigate(
				`/${i18n.language}/${data.patient._id}/${APPOINTMENTCONFIRMATION}`
			);
			showAlert({
				message: data.message,
				severity: 'success',
			});
		},
		onError: (error: CustomError) => {
			showAlert({
				message: error.message,
				severity: 'error',
			});
		},
	});

	const updatePatientMutation = useMutation({
		mutationFn: updatePatientDetailsById,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['patientDetails', data.patient?._id],
			});

			showAlert({
				message: data.message,
				severity: 'success',
			});
		},
		onError: (error: CustomError) => {
			showAlert({
				message: error.message,
				severity: 'error',
			});
		},
	});

	const bookAppointmentWithLink = (data: IBookAppointment) =>
		bookAppointmentFromLinkMutation.mutate(data);

	const updatePatientDetails = (data: IEditPatientDetailsById) =>
		updatePatientMutation.mutate(data);

	return (
		<PatientContext.Provider
			value={{
				bookAppointmentWithLink,
				bookAppointmentFromLinkMttnIsLoading:
					bookAppointmentFromLinkMutation.isPending,
				updatePatientDetails,
				updatePatientIsLoading: updatePatientMutation.isPending,
			}}
		>
			{children}
		</PatientContext.Provider>
	);
};

export const usePatient = (patientId?: string) => {
	const context = useContext(PatientContext);
	if (!context) {
		throw new Error('usePatient must be used within an PatientProvider');
	}

	const queryClient = useQueryClient();

	const cachedPatient = queryClient.getQueryData<IPatient>([
		'patientDetails',
		patientId,
	]);

	const {
		data: patientDetails,
		isLoading: isPatientDetailsLoading,
		isSuccess: isPatientDetailsSucces,
	} = useQuery<IPatient>({
		queryKey: ['patientDetails', patientId],
		queryFn: () => getPatientById(patientId),
		enabled: Boolean(patientId && patientId !== 'undefined'),
		initialData: cachedPatient,
	});

	return {
		...context,
		patientDetails,
		isPatientDetailsLoading,
		isPatientDetailsSucces,
	};
};
