import apiClient from '@psycron/api/axios-instance';

import type {
	IWeekdaysNames,
	RecurrencePattern,
} from '../user/availability/index.types';

export interface IGenerateAvailabilityPayload {
	prompt: string;
}

export interface ISlotGenerated {
	endTime: string; // '18:00'
	startTime: string; // '09:00'
	weekday: IWeekdaysNames; // 'MONDAY' | 'TUESDAY' | ...
}

export interface IGeneratedAvailability {
	days: ISlotGenerated[];
	durationInMinutes: number;
	recurrencePattern: RecurrencePattern;
}

export const generateAvailabilityFromPrompt = async (
	payload: IGenerateAvailabilityPayload
): Promise<IGeneratedAvailability> => {
	const response = await apiClient.post<IGeneratedAvailability>(
		'/ai/availability/generate',
		payload
	);
	return response.data;
};
