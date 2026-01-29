import { BACKOFFICE, DASHBOARD } from '@psycron/pages/urls';
import { isTestEnv } from '@psycron/utils/runtimeEnv';
import { PSYCRON_BASE_API } from '@psycron/utils/variables';

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
	const apiBase = PSYCRON_BASE_API;

	const isTest = isTestEnv();

	const path = isTest ? 'auth/worker/google' : 'auth/google';

	const url = makeUrl(apiBase, path);

	const returnPath = isTest ? BACKOFFICE : DASHBOARD;

	url.searchParams.set('timeZone', getTimeZone());
	url.searchParams.set('returnTo', `/${returnPath}`);
	url.searchParams.set('intent', intent);

	if (typeof stayConnected === 'boolean' || isTest) {
		url.searchParams.set('stayConnected', String(stayConnected));
	}

	if (locale) {
		url.searchParams.set('locale', locale);
	}

	window.location.assign(url.toString());
};
