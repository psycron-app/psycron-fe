import { ID_TOKEN, REFRESH_TOKEN } from '@psycron/utils/tokens';
import axios from 'axios';

import { refreshTokenService } from './auth';

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_PSYCRON_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

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

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);

				if (!storedRefreshToken) {
					throw new Error('No refresh token found');
				}

				const { accessToken, refreshToken } =
					await refreshTokenService(storedRefreshToken);

				localStorage.setItem(ID_TOKEN, accessToken);
				localStorage.setItem(REFRESH_TOKEN, refreshToken);

				apiClient.defaults.headers.common['Authorization'] =
					`Bearer ${accessToken}`;
				originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

				return apiClient(originalRequest);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error('Token refresh failed:', err);

				localStorage.removeItem(ID_TOKEN);
				localStorage.removeItem(REFRESH_TOKEN);
			}
		}
		const errorMessage =
			error.response?.data?.message || 'Unknown error occurred';
		const statusCode = error.response?.status || 500;
		return Promise.reject({ message: errorMessage, statusCode });
	}
);

export default apiClient;
