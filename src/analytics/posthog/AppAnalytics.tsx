import { type FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostHog } from '@posthog/react';
import type { Properties } from 'posthog-js';

import type { AppAnalyticsProps } from './AppAnalytics.types';

const identifyProps = {
	app_area: 'therapist',
	actor_role: 'therapist',
} as const;

export const AppAnalytics: FC<AppAnalyticsProps> = ({
	isAuthenticated,
	distinctId,
}: AppAnalyticsProps) => {
	const client = usePostHog();
	const location = useLocation();

	useEffect((): void => {
		if (!isAuthenticated || !distinctId) return;

		client.identify(distinctId, identifyProps);
	}, [client, isAuthenticated, distinctId]);

	useEffect((): void => {
		if (!isAuthenticated || !distinctId) return;

		const props: Properties = {
			$current_url: window.location.href,
			...identifyProps,
		};

		client.capture('$pageview', props);
	}, [client, isAuthenticated, distinctId, location.pathname, location.search]);

	return null;
};
