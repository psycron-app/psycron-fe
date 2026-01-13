import { ID_TOKEN } from '@psycron/utils/tokens';

import apiClient from '../axios-instance';

import type {
	AvailabilityThreadResponse,
	ICollectAvailabilityStepResponse,
	IGenerateAvailabilityPayload,
	IGeneratedAvailability,
	OnTokenCallback,
} from './index.types';

const baseURL = import.meta.env.VITE_PSYCRON_BASE_API_URL;

export const generateAvailabilityFromPrompt = async (
	payload: IGenerateAvailabilityPayload
): Promise<IGeneratedAvailability> => {
	const response = await apiClient.post<IGeneratedAvailability>(
		'/ai/availability/generate',
		payload
	);
	return response.data;
};

export const collectAvailabilityStepWithChatGPT = async (
	message: string
): Promise<ICollectAvailabilityStepResponse> => {
	const response = await apiClient.post<ICollectAvailabilityStepResponse>(
		'/ai/availability/thread',
		{ message }
	);

	return response.data;
};

export const getAvailabilityThreadById = async (
	threadId: string
): Promise<AvailabilityThreadResponse> => {
	const response = await apiClient.get(`/ai/availability/thread/${threadId}`);

	return response.data;
};

export const collectAvailabilityStepWithChatGPTStreamed = async (
	message: string,
	onToken: OnTokenCallback
): Promise<void> => {
	const token = localStorage.getItem(ID_TOKEN);
	const response = await fetch(`${baseURL}/ai/availability/thread`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ message }),
	});

	const reader = response.body?.getReader();
	const decoder = new TextDecoder();

	if (!reader) throw new Error('Failed to get response stream');

	let buffer = '';

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });

		const parts = buffer.split('\n\n');
		buffer = parts.pop() ?? '';

		for (const part of parts) {
			if (part.startsWith('data: ')) {
				const content = part.replace('data: ', '').trim();
				if (content === '[DONE]') return;
				onToken(content);
			}
		}
	}
};
