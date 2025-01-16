import apiClient from '../axios-instance';

import type {
	ICancelAppointment,
	ICancelAppointmentResponse,
} from './index.types';

export const cancelAppointment = async ({
	therapistId,
	sessionDateId,
	data,
}: ICancelAppointment) => {
	const response = await apiClient.post<ICancelAppointmentResponse>(
		`/patient/${therapistId}/appointment/${sessionDateId}/cancel`,
		data
	);

	return response.data;
};
