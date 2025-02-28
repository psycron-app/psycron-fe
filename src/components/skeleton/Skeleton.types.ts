import type { ReactElement } from 'react';

export interface ISkeleton {
	children: ReactElement;
	onClick?: () => void;
	text: string;
}
