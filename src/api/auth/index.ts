import type {
	IRefreshToken,
	ISignInForm,
	ISignInResponse,
} from '@psycron/components/form/SignIn/SignIn.types';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUp.types';
import type {
	IResetPass,
	IResetPassResponse,
} from '@psycron/pages/auth/password/ChangePassword.types';
import type {
	IEmailForm,
	IEmailResponse,
} from '@psycron/pages/auth/password/ResetPassword.types';
import { ENCRYPTION_KEY, ID_TOKEN } from '@psycron/utils/tokens';

import apiClient from '../axios-instance';

import type { IEncryptionKeyResponse } from './index.types';

export const signInFc = async (data: ISignInForm): Promise<ISignInResponse> => {
	const response = await apiClient.post<ISignInResponse>('/users/login', data);
	return response.data;
};

export const signUpFc = async (data: ISignUpForm): Promise<ISignInResponse> => {
	const response = await apiClient.post<ISignInResponse>(
		'/users/register',
		data
	);

	return response.data;
};

export const logoutFc = async (): Promise<void> => {
	await apiClient.post('/users/logout');
};

export const getSession = async (): Promise<{ isAuthenticated: boolean }> => {
	const token = localStorage.getItem(ID_TOKEN);

	const response = await apiClient.get('/users/session', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
};

export const requestPassReset = async (
	data: IEmailForm
): Promise<IEmailResponse> => {
	const response = await apiClient.post('/users/request-password-reset', data);
	return response.data;
};

export const resetPassword = async (
	data: IResetPass
): Promise<IResetPassResponse> => {
	const { token, password, confirmPassword } = data;

	const response = await apiClient.post(`/users/password-reset/${token}`, {
		password,
		confirmPassword,
	});
	return response.data;
};

export const refreshTokenService = async (
	refreshToken: string
): Promise<IRefreshToken> => {
	const { data } = await apiClient.post('/token/refresh-token', {
		refreshToken,
	});

	return data;
};

export const getEncryptionKey = async (): Promise<string | null> => {
	const cachedKey = sessionStorage.getItem(ENCRYPTION_KEY);
	if (cachedKey) return cachedKey;

	const response = await apiClient.get<IEncryptionKeyResponse>(
		'token/encryption-key',
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem(ID_TOKEN)}`,
			},
		}
	);

	const encryptionKey = response.data.key;

	if (encryptionKey) {
		sessionStorage.setItem(ENCRYPTION_KEY, encryptionKey);
	}

	return encryptionKey;
};
