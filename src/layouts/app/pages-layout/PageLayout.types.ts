import type { ReactNode } from 'react';
import type { To } from 'react-router-dom';

export interface IPageLayout {
	backButton?: boolean;
	backTo?: To;
	children: ReactNode;
	isLoading?: boolean;
	subTitle?: string;
	title?: string;
}
