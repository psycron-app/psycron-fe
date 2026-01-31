import type { ReactNode } from 'react';

export type PatientsSectionContentProps = {
	onGoToPatients: () => void;
	patients?: readonly unknown[] | null;
	rightSlot?: {
		cta?: ReactNode;
	};
};
