import { IconLogoColor } from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';

import {
	ChatMessageContent,
	ChatMessageWrapper,
	StyledIconWrapper,
} from './ChatMessage.styles';
import type { IChatMessage } from './ChatMessage.types';

export const ChatMessage = ({ bot, icon, message }: IChatMessage) => {
	return (
		<ChatMessageWrapper isBot={bot}>
			<ChatMessageContent>
				{icon ? (
					<StyledIconWrapper>
						<IconLogoColor />
					</StyledIconWrapper>
				) : null}
				<Text isFirstUpper>{message}</Text>
			</ChatMessageContent>
		</ChatMessageWrapper>
	);
};
