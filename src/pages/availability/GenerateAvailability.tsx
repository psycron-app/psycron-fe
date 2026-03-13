import { useState } from 'react';
import { AnimatedBackground } from '@psycron/components/animated-background/AnimatedBackground';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';

import { JupiterConversation } from './jupiter-conversation/JupiterConversation';
import { JupiterWelcome } from './jupiter-welcome/JupiterWelcome';
import { GenerateAvailabilityContentWrapper } from './GenerateAvailability.styles';

type JupiterPhase = 'welcome' | 'conversation';

export const GenerateAvailability = () => {
	const [phase, setPhase] = useState<JupiterPhase>('welcome');

	const handleStart = () => {
		setPhase('conversation');
	};

	if (phase === 'welcome') {
		return (
			<PageLayout title='' isLoading={false}>
				<JupiterWelcome onStart={handleStart} />
			</PageLayout>
		);
	}

	return (
		<PageLayout title='' isLoading={false}>
			<GenerateAvailabilityContentWrapper>
				<JupiterConversation />
				<AnimatedBackground />
			</GenerateAvailabilityContentWrapper>
		</PageLayout>
	);
};
