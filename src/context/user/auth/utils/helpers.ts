import { ID_TOKEN, REFRESH_TOKEN } from '@psycron/utils/tokens';

export const setTokens = (token?: string, refreshToken?: string) => {
	if (token) localStorage.setItem(ID_TOKEN, token);
	if (refreshToken) localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const clearTokens = () => {
	localStorage.removeItem(ID_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
};
