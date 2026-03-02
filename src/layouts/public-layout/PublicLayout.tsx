import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { clearSentryUser } from '@psycron/analytics/sentry/sentry';
import { EnvironmentBanner } from '@psycron/components/environment-banner/EnvironmentBanner';
import { Header } from '@psycron/components/header/Header';
import { useRuntimeEnv } from '@psycron/context/runtime/RuntimeEnvContext';
import { useWorkerAuthPresence } from '@psycron/hooks/useWorkerAuthPresence';

import {
	PublicLayoutContent,
	PublicLayoutWrapper,
} from './PublicLayout.styles';

export const PublicLayout = () => {
	useEffect(() => {
		clearSentryUser();
	}, []);

	const { isTestingEnv } = useRuntimeEnv();

	const hasWorkerAuth = useWorkerAuthPresence();

	return (
		<>
			<PublicLayoutWrapper>
				{hasWorkerAuth ? <Header /> : null}
				<PublicLayoutContent>
					<EnvironmentBanner isVisible={hasWorkerAuth && isTestingEnv} />
					<Outlet />
				</PublicLayoutContent>
			</PublicLayoutWrapper>
		</>
	);
};
