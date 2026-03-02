import { type FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostHog } from '@posthog/react';
import type { CustomError } from '@psycron/api/error';
import { posthog, type Properties } from 'posthog-js';

import type { AppAnalyticsProps } from './AppAnalytics.types';

export const toEditUserErrorCode = (error: CustomError): string => {
	const msg = String(error.message ?? '').toLowerCase();
	if (msg.includes('not-allowed') || msg.includes('forbidden'))
		return 'not_allowed';
	if (msg.includes('not-found')) return 'not_found';
	if (msg.includes('invalid')) return 'invalid';
	return 'unknown';
};

export const capture = (
	event: string,
	props?: Record<string, string | number | boolean | null>
): void => {
	posthog.capture(event, props);
};

export const AppAnalytics: FC<AppAnalyticsProps> = ({
	isAuthenticated,
	distinctId,
}: AppAnalyticsProps) => {
	const posthog = usePostHog();
	const location = useLocation();

	useEffect((): void => {
		if (!isAuthenticated || !distinctId) return;

		posthog.identify(distinctId, {
			app_area: 'therapist',
			actor_role: 'therapist',
		});
	}, [posthog, isAuthenticated, distinctId]);

	useEffect((): void => {
		if (!isAuthenticated || !distinctId) return;

		const props: Properties = {
			$current_url: window.location.href,
			app_area: 'therapist',
			actor_role: 'therapist',
		};

		posthog.capture('$pageview', props);
	}, [
		posthog,
		isAuthenticated,
		distinctId,
		location.pathname,
		location.search,
	]);

	return null;
};
