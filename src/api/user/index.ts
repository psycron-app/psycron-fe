import type { ITherapist } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import apiClient from '../axios-instance';

import type {
	IChangePass,
	IEditUser,
	IResponse,
	IUserByIdResponse,
} from './index.types';

export const getUserById = async (userId: string): Promise<ITherapist> => {
	const response = await apiClient.get<IUserByIdResponse>(`/users/${userId}`);

	return response.data.user;
};

export const editUserById = async ({
	data,
	userId,
}: IEditUser): Promise<IUserByIdResponse> => {
	const response = await apiClient.post<IUserByIdResponse>(
		`/users/edit/${userId}`,
		data
	);

	return response.data;
};

export const changePassword = async ({ data, userId }: IChangePass) => {
	const response = await apiClient.post<IResponse>(
		`/users/password-change/${userId}`,
		data
	);

	return response.data;
};
