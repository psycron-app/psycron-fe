import type { ReactNode } from 'react';

export type UserDetailsSectionProps = {
	actions?: ReactNode;
	children: ReactNode;
	'data-testid'?: string;
	icon: ReactNode;
	title: string;
};
