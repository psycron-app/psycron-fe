export type ChatMessageRole = 'assistant' | 'system' | 'user';

export interface IChatMessage {
	bot?: boolean;
	icon?: boolean;
	isThinking?: boolean;
	message: string;
	role: ChatMessageRole;
	shouldApplyGlass?: boolean;
}
