import type { ReactNode } from 'react';

export interface IChatMessage {
	bot?: boolean;
	icon?: boolean;
	message: string | ReactNode;
}
