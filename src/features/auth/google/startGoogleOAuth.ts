import type { StartGoogleOAuthArgs } from './GoogleOAuthButton.types';

const getTimeZone = (): string =>
	Intl.DateTimeFormat().resolvedOptions().timeZone;

export const startGoogleOAuth = ({
	stayConnected,
	locale,
}: StartGoogleOAuthArgs = {}): void => {
	const apiBase = import.meta.env.VITE_PSYCRON_BASE_API_URL as string;

	const url = new URL('/auth/google', apiBase);
	url.searchParams.set('timeZone', getTimeZone());

	if (typeof stayConnected === 'boolean') {
		url.searchParams.set('stayConnected', String(stayConnected));
	}

	if (locale) {
		url.searchParams.set('locale', locale);
	}

	window.location.assign(url.toString());
};
