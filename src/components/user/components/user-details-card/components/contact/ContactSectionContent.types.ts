import type { ReactNode } from 'react';

export type ContactSectionContentProps = {
	onEditContacts: () => void;
	phone?: string | null;

	rightSlot?: {
		phone?: ReactNode;
		whatsapp?: ReactNode;
	};

	whatsapp?: string | null;
};

export type PreferredContact =
	| { kind: 'whatsapp'; value: string }
	| { kind: 'phone'; value: string }
	| { kind: 'empty' };
