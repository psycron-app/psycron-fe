import apiClient from '../axios-instance';

export type ParseField = 'working-days' | 'time-range' | 'session-duration';

export type ParseInputResult =
	| { parsed: string[], valid: true; }
	| { parsed: string, valid: true; }
	| { valid: false };

export const parseJupiterInput = async (
	field: ParseField,
	value: string
): Promise<ParseInputResult> => {
	const response = await apiClient.post<ParseInputResult>(
		'/jupiter/availability/parse-input',
		{ field, value }
	);
	return response.data;
};

export interface JupiterPublishPayload {
	sessionDuration: string;
	sessionType: string;
	timeRange: string;
	timezone: string;
	workingDays: string[];
}

export const generateJupiterAvailability = async (
	payload: JupiterPublishPayload
): Promise<{ availabilityId: string }> => {
	const response = await apiClient.post<{ availabilityId: string }>(
		'/jupiter/availability/generate',
		payload
	);
	return response.data;
};
