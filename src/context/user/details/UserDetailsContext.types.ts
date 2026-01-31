import type { ReactNode } from 'react';

import type { ITherapist } from '../auth/UserAuthenticationContext.types';

export interface UserDetailsProviderProps {
	children: ReactNode;
}

export interface UserDetailsContextType {
	closeDeleteDialog: () => void;
	handleClickEditSession: (userId: string, session: string) => void;

	// Navigation actions
	handleClickEditUser: (id: string) => void;
	// Delete modal state
	isDeleteOpen: boolean;

	// UI state
	isUserDetailsVisible: boolean;

	openDeleteDialog: () => void;
	toggleUserDetails: () => void;
	// Auth/session user (from AuthContext)
	user?: ITherapist;
}

export type UserDetailsHookReturn = {
	clearMockUserDetails: () => void;
	// new:
	isMockedUserDetails: boolean;
	isUserDetailsLoading: boolean;

	isUserDetailsSucces: boolean;
	setMockUserDetails: (user: ITherapist) => void;
	// existing fields you already return...
	userDetails: ITherapist | null;
};
