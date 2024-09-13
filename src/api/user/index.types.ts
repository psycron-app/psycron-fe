import type { ITherapist } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IUserByIdResponse {
	user: ITherapist;
}

export interface IEditUser {
	data: Partial<ITherapist>;
	userId: string;
}

export interface IPasswordChange {
	confirmPassword: string;
	newPassword: string;
	password: string;
}

export interface IChangePass {
	data: IPasswordChange;
	userId: string;
}

export interface IResponse {
	message: string;
	status: string;
}
