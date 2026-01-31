export type AuthPersistence = 'local' | 'session';

const WORKER_ID_TOKEN = '_psyw_at';
const WORKER_REFRESH_TOKEN = '_psyw_rt';
const WORKER_STORAGE_KIND_KEY = '_psyw_persist';

const getStorageByKind = (kind: AuthPersistence): Storage =>
	kind === 'session' ? sessionStorage : localStorage;

const removeFromBoth = (key: string): void => {
	localStorage.removeItem(key);
	sessionStorage.removeItem(key);
};

export const setWorkerTokens = (args: {
	accessToken: string;
	persist: boolean;
	refreshToken: string;
}): void => {
	const kind: AuthPersistence = args.persist ? 'local' : 'session';
	localStorage.setItem(WORKER_STORAGE_KIND_KEY, kind);

	const storage = getStorageByKind(kind);

	removeFromBoth(WORKER_ID_TOKEN);
	removeFromBoth(WORKER_REFRESH_TOKEN);

	storage.setItem(WORKER_ID_TOKEN, args.accessToken);
	storage.setItem(WORKER_REFRESH_TOKEN, args.refreshToken);
};

export const setWorkerTokensKeepingPersistence = (args: {
	accessToken: string;
	refreshToken: string;
}): void => {
	const kindFromStorage = localStorage.getItem(WORKER_STORAGE_KIND_KEY);

	const kind: AuthPersistence =
		kindFromStorage === 'session' || kindFromStorage === 'local'
			? kindFromStorage
			: 'local';

	const storage = getStorageByKind(kind);

	removeFromBoth(WORKER_ID_TOKEN);
	removeFromBoth(WORKER_REFRESH_TOKEN);

	storage.setItem(WORKER_ID_TOKEN, args.accessToken);
	storage.setItem(WORKER_REFRESH_TOKEN, args.refreshToken);
};

export const getWorkerAccessToken = (): string | null =>
	localStorage.getItem(WORKER_ID_TOKEN) ??
	sessionStorage.getItem(WORKER_ID_TOKEN);

export const getWorkerRefreshToken = (): string | null =>
	localStorage.getItem(WORKER_REFRESH_TOKEN) ??
	sessionStorage.getItem(WORKER_REFRESH_TOKEN);

export const clearWorkerTokens = (): void => {
	removeFromBoth(WORKER_ID_TOKEN);
	removeFromBoth(WORKER_REFRESH_TOKEN);
	localStorage.removeItem(WORKER_STORAGE_KIND_KEY);
};
