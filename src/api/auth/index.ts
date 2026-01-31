import type {
	IRefreshToken,
	ISignInForm,
	ISignInResponse,
	IVerifyEmailResponse,
} from '@psycron/components/form/SignIn/SignIn.types';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUpEmail.types';
import type {
	IResetPass,
	IResetPassResponse,
} from '@psycron/pages/auth/password/ChangePassword.types';
import type {
	IEmailForm,
	IEmailResponse,
} from '@psycron/pages/auth/password/ResetPassword.types';

import apiClient from '../axios-instance';

import { mapSignUpFormToRegisterPayload } from './utils/auth-utils';
import type { RegisterResponse, SessionResponse } from './index.types';

export const signUpFc = async (
	data: ISignUpForm
): Promise<RegisterResponse> => {
	const payload = mapSignUpFormToRegisterPayload(data);

	const response = await apiClient.post<RegisterResponse>(
		'/users/register',
		payload
	);

	return response.data;
};

export const signInFc = async (data: ISignInForm): Promise<ISignInResponse> => {
	const response = await apiClient.post<ISignInResponse>('/users/login', data);
	return response.data;
};

export const logoutFc = async (): Promise<void> => {
	await apiClient.post('/users/logout');
};

export const getSession = async (): Promise<SessionResponse> => {
	const response = await apiClient.get<SessionResponse>('/users/session');
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
	const { data } = await apiClient.post<IRefreshToken>('/token/refresh-token', {
		refreshToken,
	});

	return data;
};

export const verifyEmail = async (
	token: string
): Promise<IVerifyEmailResponse> => {
	const { data } = await apiClient.post<IVerifyEmailResponse>(
		'/users/verify-email',
		{
			token,
		}
	);

	return data;
};

/**
 * @deprecated getEncryptionKey removed for security (P1.3)
 * The encryption key endpoint was removed from the backend.
 * Use useSecureStorage without encryption for non-sensitive IDs.
 */
