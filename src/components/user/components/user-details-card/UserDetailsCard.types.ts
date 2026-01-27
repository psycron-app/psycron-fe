import type { ReactNode } from 'react';
import type { ITherapist } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IUserDetailsCardProps {
	user: ITherapist;
}

export interface IUserItem {
	icon: ReactNode;
	name: string;
	value: ReactNode;
}
