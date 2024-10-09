import type { IPatient } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import apiClient from '../axios-instance';

import type {
	IBookAppointment,
	IBookAppointmentResponse,
	IPatientByIdResponse,
} from './index.types';

export const bookAppointmentFromLink = async ({
	therapistId,
	data,
}: IBookAppointment): Promise<IBookAppointmentResponse> => {
	const response = await apiClient.post<IBookAppointmentResponse>(
		`/patient/${therapistId}/book-appointment`,
		data
	);

	return response.data;
};

export const getPatientById = async (userId: string): Promise<IPatient> => {
	const response = await apiClient.get<IPatientByIdResponse>(
		`/users/${userId}`
	);

	return response.data.user;
};
