import apiClient from '../axios-instance';

import type {
	ICancelAppointment,
	ICancelEditAppointmentResponse,
	IEditAppointment,
	IPatientEditAppointmentResponse,
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
	oldSlotId,
	newSlotId,
	availabilityDayId,
	patientId,
}: IEditAppointment) => {
	const response = await apiClient.post<IPatientEditAppointmentResponse>(
		`/patient/${therapistId}/appointment/${oldSlotId}/edit`,
		{ newSlotId, availabilityDayId, patientId }
	);

	return response.data;
};
