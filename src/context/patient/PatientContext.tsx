import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CustomError } from '@psycron/api/error';
import { bookAppointmentFromLink, getPatientById } from '@psycron/api/patient';
import type { IBookAppointment } from '@psycron/api/patient/index.types';
import i18n from '@psycron/i18n';
import { APPOINTMENTCONFIRMATION } from '@psycron/pages/urls';
import { useMutation, useQuery } from '@tanstack/react-query';

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

	const bookAppointmentWithLink = (data: IBookAppointment) =>
		bookAppointmentFromLinkMutation.mutate(data);

	return (
		<PatientContext.Provider
			value={{
				bookAppointmentWithLink,
				bookAppointmentFromLinkMttnIsLoading:
					bookAppointmentFromLinkMutation.isPending,
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

	const {
		data: patientDetails,
		isLoading: isPatientDetailsLoading,
		isSuccess: isPatientDetailsSucces,
	} = useQuery<IPatient>({
		queryKey: ['userDetails', patientId],
		queryFn: () => getPatientById(patientId),
		enabled: !!patientId,
	});

	return {
		...context,
		patientDetails,
		isPatientDetailsLoading,
		isPatientDetailsSucces,
	};
};
