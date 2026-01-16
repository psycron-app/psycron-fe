import type { ReactNode } from 'react';

import type { ITherapist } from '../auth/UserAuthenticationContext.types';

export interface UserDetailsContextType {
	closeDeleteDialog: () => void;
	handleClickEditSession: (userId: string, session: string) => void;
	handleClickEditUser: (path: string) => void;
	isDeleteOpen: boolean;
	isUserDetailsVisible: boolean;
	openDeleteDialog: () => void;
	toggleUserDetails: () => void;
	user?: ITherapist;
}

export interface UserDetailsProviderProps {
	children: ReactNode;
}

export type EditSession = 'password' | 'subscription' | 'patients';
