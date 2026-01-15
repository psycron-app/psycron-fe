import { ID_TOKEN, REFRESH_TOKEN } from '@psycron/utils/tokens';
import axios from 'axios';

import { sanitizeAuthError } from './auth/auth-errors';
import { refreshTokenService } from './auth';
import { CustomError } from './error';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_PSYCRON_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

/**
 * Request interceptor - adds auth token to requests
 */
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ID_TOKEN);
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

/**
 * Response interceptor - handles errors and token refresh
 *
 * Security: All auth-related errors are sanitized to prevent user enumeration.
 * Rate limiting: 429 responses include retry information.
 */
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const statusCode = error.response?.status || 500;
		const requestUrl = originalRequest?.url || '';

		// Handle 401 Unauthorized - attempt token refresh
		if (statusCode === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);

				if (!storedRefreshToken) {
					clearAuthTokens();
					return Promise.reject(
						createSanitizedError('Session expired', 401, requestUrl)
					);
				}

				const { accessToken, refreshToken } =
					await refreshTokenService(storedRefreshToken);

				localStorage.setItem(ID_TOKEN, accessToken);
				localStorage.setItem(REFRESH_TOKEN, refreshToken);

				apiClient.defaults.headers.common['Authorization'] =
					`Bearer ${accessToken}`;
				originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

				return apiClient(originalRequest);
			} catch {
				clearAuthTokens();
				return Promise.reject(
					createSanitizedError('Session expired', 401, requestUrl)
				);
			}
		}

		// Handle 429 Rate Limited
		if (statusCode === 429) {
			const retryAfter = error.response?.headers?.['retry-after'];
			const rateLimitError = createSanitizedError(
				'Rate limited',
				429,
				requestUrl
			);
			if (retryAfter) {
				(rateLimitError as CustomError & { retryAfter: number }).retryAfter =
					parseInt(retryAfter, 10);
			}
			return Promise.reject(rateLimitError);
		}

		// Create and sanitize the error
		const errorMessage =
			error.response?.data?.message || 'Unknown error occurred';
		return Promise.reject(
			createSanitizedError(errorMessage, statusCode, requestUrl)
		);
	}
);

/**
 * Creates a sanitized error that prevents user enumeration
 */
const createSanitizedError = (
	message: string,
	statusCode: number,
	requestUrl: string
): CustomError => {
	const rawError = new CustomError(message, statusCode);
	return sanitizeAuthError(rawError, requestUrl);
};

/**
 * Clears all auth tokens from storage
 */
const clearAuthTokens = (): void => {
	localStorage.removeItem(ID_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
};

export default apiClient;
