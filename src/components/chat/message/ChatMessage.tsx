import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { Jupiter } from '@psycron/components/icons';
import { LoaderBubbles } from '@psycron/components/loader/bubbles/LoaderBubbles';

import {
	ChatMessageContent,
	ChatMessageWrapper,
	ChatText,
	StyledIconWrapper,
	UserBubble,
	UserBubbleSmall,
} from './ChatMessage.styles';
import type { IChatMessage } from './ChatMessage.types';

export const ChatMessage = forwardRef<HTMLDivElement, IChatMessage>(
	({ bot, icon, message, isThinking, shouldApplyGlass }, ref) => {
		return (
			<ChatMessageWrapper
				ref={ref}
				isBot={bot}
				shouldApplyGlass={shouldApplyGlass}
			>
				{!bot && (
					<Box>
						<UserBubble />
						<UserBubbleSmall />
					</Box>
				)}
				<ChatMessageContent>
					{icon && (
						<StyledIconWrapper>
							<Jupiter />
						</StyledIconWrapper>
					)}
					{isThinking ? (
						<LoaderBubbles />
					) : (
						<ChatText isFirstUpper isBot={bot}>
							{message}
						</ChatText>
					)}
				</ChatMessageContent>
			</ChatMessageWrapper>
		);
	}
);

ChatMessage.displayName = 'ChatMessage';
