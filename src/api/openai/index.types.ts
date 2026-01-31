import type { IChatMessage } from '@psycron/components/chat/message/ChatMessage.types';

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

export interface ICollectAvailabilityStepResponse {
	availabilityDraft: IAvailabilityDraft;
	isDraftComplete?: boolean;
	nextQuestion: string;
	threadId: string;
}

export interface IAvailabilityDraft {
	days?: Array<{
		endTime: string;
		startTime: string;
		weekday:
			| 'MONDAY'
			| 'TUESDAY'
			| 'WEDNESDAY'
			| 'THURSDAY'
			| 'FRIDAY'
			| 'SATURDAY'
			| 'SUNDAY';
	}>;
	recurrencePattern?: 'WEEKLY' | 'MONTHLY';
	therapySettings: ITherapySettings[];
	therapyTypes?: string[];
}

export interface ITherapySettings {
	durationInMinutes: number;
	gapBetweenSessionsInMinutes?: number;
	type: string;
}

export type ChatMessageRole = 'system' | 'user' | 'assistant';

export interface AvailabilityThreadResponse {
	isDraftComplete: boolean;
	lastStep: string;
	latestDraft: IAvailabilityDraft;
	messages: IChatMessage[];
	threadId: string;
}

export type OnTokenCallback = (token: string) => void;
