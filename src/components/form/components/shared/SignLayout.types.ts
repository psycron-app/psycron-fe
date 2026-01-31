import type { ReactNode } from 'react';

export interface ISignLayout {
	children: ReactNode;
	isLoading?: boolean;
	isReset?: boolean;
	isSignin?: boolean;
	title?: string;
}
