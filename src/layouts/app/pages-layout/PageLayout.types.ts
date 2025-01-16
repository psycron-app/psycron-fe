import type { ReactNode } from 'react';

export interface IPageLayout {
	children: ReactNode;
	isLoading?: boolean;
	title?: string;
}
