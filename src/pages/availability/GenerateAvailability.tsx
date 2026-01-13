import { AnimatedBackground } from '@psycron/components/animated-background/AnimatedBackground';
import { ChatMessageList } from '@psycron/components/chat/message-list/ChatMessageList';
import { Prompt } from '@psycron/components/chat/prompt/Prompt';
import { useAvailabilityAssistant } from '@psycron/hooks/availability/useAvailabilityAssistant';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';

import { GenerateAvailabilityContentWrapper } from './GenerateAvailability.styles';

export const GenerateAvailability = () => {
	const { messages, sendMessage } = useAvailabilityAssistant();
	console.log('🚀 ~ GenerateAvailability ~ messages:', messages);

	return (
		<PageLayout title={'Generate your Availability'} isLoading={false}>
			<GenerateAvailabilityContentWrapper>
				<ChatMessageList messages={messages} />
				<AnimatedBackground />
			</GenerateAvailabilityContentWrapper>
			<Prompt onSubmit={sendMessage} />
		</PageLayout>
	);
};
