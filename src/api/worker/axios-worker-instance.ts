import {
	clearWorkerTokens,
	getWorkerAccessToken,
	getWorkerRefreshToken,
	setWorkerTokensKeepingPersistence,
} from '@psycron/context/worker/utils/workerTokenStorage';
import { PSYCRON_BASE_API } from '@psycron/utils/variables';
import type {
	AxiosError,
	AxiosInstance,
	InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

import { sanitizeAuthError } from '../auth/auth-errors';
import { CustomError } from '../error';

import { refreshWorkerTokenService } from './workerRefresh';

type ApiErrorPayload = {
	message?: string;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
	_retry?: boolean;
};

const workerApiClient: AxiosInstance = axios.create({
	baseURL: PSYCRON_BASE_API as string,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

const createSanitizedError = (
	message: string,
	statusCode: number,
	requestUrl: string
): CustomError => {
	const rawError = new CustomError(message, statusCode);
	return sanitizeAuthError(rawError, requestUrl);
};

workerApiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getWorkerAccessToken();
		if (token) config.headers.set('Authorization', `Bearer ${token}`);
		return config;
	},
	(error) => Promise.reject(error)
);

workerApiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<ApiErrorPayload>) => {
		const originalRequest = error.config as RetryableRequestConfig | undefined;
		const statusCode = error.response?.status ?? 500;
		const requestUrl = originalRequest?.url ?? '';

		if (statusCode === 401 && originalRequest && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const storedRefreshToken = getWorkerRefreshToken();

				if (!storedRefreshToken) {
					clearWorkerTokens();
					return Promise.reject(
						createSanitizedError('Session expired', 401, requestUrl)
					);
				}

				const { accessToken, refreshToken } =
					await refreshWorkerTokenService(storedRefreshToken);

				setWorkerTokensKeepingPersistence({ accessToken, refreshToken });

				workerApiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
				originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);

				return workerApiClient(originalRequest);
			} catch {
				clearWorkerTokens();
				return Promise.reject(
					createSanitizedError('Session expired', 401, requestUrl)
				);
			}
		}

		if (statusCode === 429) {
			return Promise.reject(
				createSanitizedError('Rate limited', 429, requestUrl)
			);
		}

		const message = error.response?.data?.message ?? 'Unknown error occurred';
		return Promise.reject(
			createSanitizedError(message, statusCode, requestUrl)
		);
	}
);

export default workerApiClient;
