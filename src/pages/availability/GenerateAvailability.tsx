import { Box } from '@mui/material';
import { ChatMessageList } from '@psycron/components/chat/message-list/ChatMessageList';
import { Prompt } from '@psycron/components/chat/prompt/Prompt';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';

export const GenerateAvailability = () => {
	return (
		<PageLayout title={'Generate your Availability'} isLoading={false}>
			<Box>Something here</Box>
			<ChatMessageList
				messages={[
					{ message: 'Olá! Como posso ajudar?', bot: true, icon: true },
					{ message: 'Quero atender terças e sextas à tarde.', bot: false },
				]}
			/>
			<Box>
				<Prompt />
			</Box>
		</PageLayout>
	);
};
