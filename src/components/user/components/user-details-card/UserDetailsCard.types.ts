import type { ReactNode } from 'react';
import type { ITherapist } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IUserDetailsCardProps {
	isPage?: boolean;
	user: ITherapist;
}

export interface IUserItem {
	icon: ReactNode;
	name: string;
	value: ReactNode;
}
