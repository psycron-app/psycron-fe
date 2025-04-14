import { type ReactNode } from 'react';

export interface IWizardProps {
	onComplete: () => void;
	steps: {
		content: () => ReactNode;
		label: string;
	}[];
}

export interface StepData {
	duration?: number;
	weekdays?: string[];
}
