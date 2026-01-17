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
import { ID_TOKEN } from '@psycron/utils/tokens';

import apiClient from '../axios-instance';

import { mapSignUpFormToRegisterPayload } from './utils/auth-utils';
import type {
	AuthSuccessResponse,
	RegisterResponse,
	SignUpGoogleRequest,
} from './index.types';

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

export const signUpWithGoogleFc = async (
	payload: SignUpGoogleRequest
): Promise<AuthSuccessResponse> => {
	const response = await apiClient.post<AuthSuccessResponse>(
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

/**
 * @deprecated getEncryptionKey removed for security (P1.3)
 * The encryption key endpoint was removed from the backend.
 * Use useSecureStorage without encryption for non-sensitive IDs.
 */
