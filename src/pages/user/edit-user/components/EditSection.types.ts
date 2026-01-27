import type { ReactNode } from 'react';

export type EditSectionProps = {
	children: ReactNode;
	disabled?: boolean;
	hint?: string;
	isEnabled: boolean;
	onToggle: () => void;
	title: string;
};
