import apiClient from '../axios-instance';

import type {
	IGenerateAvailabilityPayload,
	IGeneratedAvailability,
} from './index.types';

export const generateAvailabilityFromPrompt = async (
	payload: IGenerateAvailabilityPayload
): Promise<IGeneratedAvailability> => {
	const response = await apiClient.post<IGeneratedAvailability>(
		'/ai/availability/generate',
		payload
	);
	return response.data;
};
