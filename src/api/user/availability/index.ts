import apiClient from '@psycron/api/axios-instance';
import type { IAvailability } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type {
	IAvailabilityData,
	ICompleteSessionAvailabilityData,
	ICompleteSessionAvailabilityResponse,
	IInitiateAvailabilityResponse,
	ISessionResponse,
	IUpdateAvailabilitySession,
} from './index.types';

export const initiateAvailabilitySession = async (
	data: IAvailabilityData
): Promise<IInitiateAvailabilityResponse> => {
	const response = await apiClient.post<IInitiateAvailabilityResponse>(
		'/users/availability/initiate',
		data
	);

	return response.data;
};

export const updateAvailabilitySession = async ({
	sessionId,
	data,
}: IUpdateAvailabilitySession) => {
	const response = await apiClient.put(
		`/users/availability/session/${sessionId}`,
		data
	);

	return response.data;
};

export const completeSessionAvailability = async (
	sessionId: string,
	data: ICompleteSessionAvailabilityData
): Promise<ICompleteSessionAvailabilityResponse> => {
	const response = await apiClient.post<ICompleteSessionAvailabilityResponse>(
		`/users/availability/complete/${sessionId}`,
		data
	);

	return response.data;
};

export const getAvailabilitySession = async (
	sessionId: Partial<IAvailability>
): Promise<ISessionResponse> => {
	const response = await apiClient.get(
		`/users/availability/session/${sessionId}`
	);
	return response.data.session;
};
