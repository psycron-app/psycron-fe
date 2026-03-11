import { useMemo, useState } from 'react';
import { AnimatedBackground } from '@psycron/components/animated-background/AnimatedBackground';
import { ChatMessageList } from '@psycron/components/chat/message-list/ChatMessageList';
import { Prompt } from '@psycron/components/chat/prompt/Prompt';
import { useAvailabilityAssistant } from '@psycron/hooks/availability/useAvailabilityAssistant';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';
import { AVAILABILITY_THREAD_ID } from '@psycron/utils/tokens';

import { JupiterWelcome } from './jupiter-welcome/JupiterWelcome';
import { GenerateAvailabilityContentWrapper } from './GenerateAvailability.styles';

type JupiterPhase = 'welcome' | 'chat';

export const GenerateAvailability = () => {
	const hasExistingThread = useMemo(
		() => !!localStorage.getItem(AVAILABILITY_THREAD_ID),
		[]
	);

	const [phase, setPhase] = useState<JupiterPhase>(
		hasExistingThread ? 'chat' : 'welcome'
	);

	const { messages, sendMessage, isSending } = useAvailabilityAssistant();

	const handleStart = () => {
		setPhase('chat');
	};

	if (phase === 'welcome') {
		return (
			<PageLayout title='' isLoading={false}>
				<JupiterWelcome onStart={handleStart} />
			</PageLayout>
		);
	}

	return (
		<PageLayout title='Generate your Availability' isLoading={false}>
			<GenerateAvailabilityContentWrapper>
				<ChatMessageList messages={messages} isSending={isSending} />
				<AnimatedBackground />
			</GenerateAvailabilityContentWrapper>
			<Prompt onSubmit={sendMessage} />
		</PageLayout>
	);
};
