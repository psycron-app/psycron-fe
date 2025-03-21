import type { IPatient } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import apiClient from '../axios-instance';

import type {
	IBookAppointment,
	IBookAppointmentResponse,
	ICreatePatient,
	ICreatePatientResponse,
	IEditPatientDetailsById,
	IEditPatientDetailsByIdResponse,
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

export const updatePatientDetailsById = async ({
	patientId,
	patient,
}: IEditPatientDetailsById): Promise<IEditPatientDetailsByIdResponse> => {
	const response = await apiClient.put<IEditPatientDetailsByIdResponse>(
		`/patient/${patientId}`,
		patient
	);

	return response.data;
};

export const createPatientFromSlot = async ({
	therapistId,
	availabilityDayId,
	slotId,
	patient,
}: ICreatePatient): Promise<ICreatePatientResponse> => {
	const url = slotId
		? `/patient/${therapistId}/create/${availabilityDayId}/${slotId}`
		: `/patient/${therapistId}/create/${availabilityDayId}`;

	const response = await apiClient.post<ICreatePatientResponse>(url, patient);

	return response.data;
};
