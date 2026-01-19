import { ID_TOKEN, REFRESH_TOKEN } from '@psycron/utils/tokens';

export type AuthPersistence = 'local' | 'session';

const STORAGE_KIND_KEY = 'psycron_auth_persistence';

const getStorageByKind = (kind: AuthPersistence): Storage =>
	kind === 'session' ? sessionStorage : localStorage;

const readFromAnyStorage = (key: string): string | null =>
	localStorage.getItem(key) ?? sessionStorage.getItem(key);

const removeFromBoth = (key: string): void => {
	localStorage.removeItem(key);
	sessionStorage.removeItem(key);
};

export const getAuthPersistence = (): AuthPersistence => {
	const stored = localStorage.getItem(STORAGE_KIND_KEY);
	return stored === 'session' ? 'session' : 'local';
};

export const setAuthPersistence = (persist: boolean): AuthPersistence => {
	const kind: AuthPersistence = persist ? 'local' : 'session';
	localStorage.setItem(STORAGE_KIND_KEY, kind);
	return kind;
};

export const getAccessToken = (): string | null => readFromAnyStorage(ID_TOKEN);

export const getRefreshToken = (): string | null =>
	readFromAnyStorage(REFRESH_TOKEN);

export const setTokens = (args: {
	accessToken: string;
	refreshToken: string;
	// eslint-disable-next-line typescript-sort-keys/interface
	persist: boolean;
}): void => {
	const kind = setAuthPersistence(args.persist);
	const storage = getStorageByKind(kind);

	// Clear previous copies (avoids stale duplicates)
	removeFromBoth(ID_TOKEN);
	removeFromBoth(REFRESH_TOKEN);

	storage.setItem(ID_TOKEN, args.accessToken);
	storage.setItem(REFRESH_TOKEN, args.refreshToken);
};

export const setAccessToken = (token: string): void => {
	const storage = getStorageByKind(getAuthPersistence());
	removeFromBoth(ID_TOKEN);
	storage.setItem(ID_TOKEN, token);
};

export const setRefreshToken = (token: string): void => {
	const storage = getStorageByKind(getAuthPersistence());
	removeFromBoth(REFRESH_TOKEN);
	storage.setItem(REFRESH_TOKEN, token);
};

export const clearAuthTokens = (): void => {
	removeFromBoth(ID_TOKEN);
	removeFromBoth(REFRESH_TOKEN);
	localStorage.removeItem(STORAGE_KIND_KEY);
};

export const isPersistentLogin = (): boolean =>
	getAuthPersistence() === 'local';

export const setTokensKeepingAuthPersistence = (args: {
	accessToken: string;
	refreshToken: string;
}): void => {
	const kind = getAuthPersistence();
	const storage = getStorageByKind(kind);

	removeFromBoth(ID_TOKEN);
	removeFromBoth(REFRESH_TOKEN);

	storage.setItem(ID_TOKEN, args.accessToken);
	storage.setItem(REFRESH_TOKEN, args.refreshToken);
};
