import type { ChatMessageRole } from '@psycron/api/openai/index.types';

export interface IChatMessage {
	bot?: boolean;
	icon?: boolean;
	isThinking?: boolean;
	message: string;
	role: ChatMessageRole;
	shouldApplyGlass?: boolean;
}
