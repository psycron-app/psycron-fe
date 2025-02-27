import type { ReactNode } from 'react';

export type CardTitleProps = {
	firstChip?: () => void;
	firstChipName?: string | number | ReactNode;
	firstChipTooltip?: string;
	hasFirstChip?: boolean;
	hasSecondChip?: boolean;
	onClose?: () => void;
	secondChip?: () => void;
	secondChipName?: string;
	subheader?: string;
	title: string;
};
