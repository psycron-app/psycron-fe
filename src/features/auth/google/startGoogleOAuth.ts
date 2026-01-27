import { DASHBOARD } from '@psycron/pages/urls';

import type { StartGoogleOAuthArgs } from './GoogleOAuthButton.types';

const getTimeZone = (): string =>
	Intl.DateTimeFormat().resolvedOptions().timeZone;

const makeUrl = (base: string, path: string): URL => {
	const normalizedBase = base.endsWith('/') ? base : `${base}/`;
	const normalizedPath = path.replace(/^\//, '');
	return new URL(normalizedPath, normalizedBase);
};

export const startGoogleOAuth = ({
	stayConnected,
	locale,
	intent,
}: StartGoogleOAuthArgs): void => {
	const apiBase = import.meta.env.VITE_PSYCRON_BASE_API_URL as string;

	const url = makeUrl(apiBase, 'auth/google');

	url.searchParams.set('timeZone', getTimeZone());
	url.searchParams.set('returnTo', `/${DASHBOARD}`);
	url.searchParams.set('intent', intent);

	if (typeof stayConnected === 'boolean') {
		url.searchParams.set('stayConnected', String(stayConnected));
	}

	if (locale) {
		url.searchParams.set('locale', locale);
	}

	window.location.assign(url.toString());
};
