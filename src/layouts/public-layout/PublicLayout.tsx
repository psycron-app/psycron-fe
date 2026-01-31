import { Outlet } from 'react-router-dom';
import { EnvironmentBanner } from '@psycron/components/environment-banner/EnvironmentBanner';
import { Header } from '@psycron/components/header/Header';
import { useRuntimeEnv } from '@psycron/context/runtime/RuntimeEnvContext';
import { useWorkerAuthPresence } from '@psycron/hooks/useWorkerAuthPresence';

import {
	PublicLayoutContent,
	PublicLayoutWrapper,
} from './PublicLayout.styles';

export const PublicLayout = () => {
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
