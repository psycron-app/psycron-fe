import type { ReactNode } from 'react';
import type { AuthProvider } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export type AccountSectionContentProps = {
	authMethod: AuthProvider;
	email: string;
	isEmailReadOnly?: boolean;
	name: string;
	rightSlot?: {
		authMethod?: ReactNode;
		email?: ReactNode;
		name?: ReactNode;
	};
};

export type PillTone = 'neutral' | 'info';
