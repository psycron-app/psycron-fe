import apiClient from '../axios-instance';

import type {
	ICancelAppointment,
	ICancelEditAppointmentResponse,
	IEditAppointment,
} from './index.types';

export const cancelAppointment = async ({
	therapistId,
	sessionDateId,
	data,
}: ICancelAppointment) => {
	const response = await apiClient.post<ICancelEditAppointmentResponse>(
		`/patient/${therapistId}/appointment/${sessionDateId}/cancel`,
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
