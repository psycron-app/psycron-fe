import apiClient from '../axios-instance';

import type {
	ICancelAppointment,
	ICancelEditAppointmentResponse,
	IEditAppointment,
} from './index.types';

export const cancelAppointment = async ({
	therapistId,
	data,
}: ICancelAppointment): Promise<ICancelEditAppointmentResponse> => {
	const response = await apiClient.post<ICancelEditAppointmentResponse>(
		`/patient/${therapistId}/appointment/cancel`,
		data
	);

	return response.data;
};

export const editAppointment = async ({
	therapistId,
	oldSessionSlotId,
	newData,
	patientId,
}: IEditAppointment) => {
	const response = await apiClient.post<ICancelEditAppointmentResponse>(
		`/patient/${therapistId}/appointment/${oldSessionSlotId}/edit`,
		{ ...newData, patientId }
	);

	return response.data;
};
