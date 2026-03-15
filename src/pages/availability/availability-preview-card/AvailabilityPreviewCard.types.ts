import type { JupiterAnswers } from '../jupiter-conversation/JupiterConversation.types';

export interface IAvailabilityPreviewCardProps {
	answers: JupiterAnswers;
	detectedTimezone: string;
	isPublishing: boolean;
	onPublish: () => void;
	onReset: () => void;
}
