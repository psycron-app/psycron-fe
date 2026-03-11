import type { IChatMessage } from '../message/ChatMessage.types';

export interface IChatMessageList {
	isSending?: boolean;
	messages: IChatMessage[];
}
