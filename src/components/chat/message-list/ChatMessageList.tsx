import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAvailabilityAssistant } from '@psycron/hooks/availability/useAvailabilityAssistant';

import { ChatMessage } from '../message/ChatMessage';

import { ChatMessageListWrapper, OuterBox } from './ChatMessageList.styles';
import type { IChatMessageList } from './ChatMessageList.types';

export const ChatMessageList = ({ messages }: IChatMessageList) => {
	const { isSending } = useAvailabilityAssistant();
	// TODO: Remove debug log - console.log('isSending:', isSending);
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const { ref, inView } = useInView({
		threshold: 0.3,
		triggerOnce: false,
	});

	return (
		<OuterBox>
			<ChatMessageListWrapper hasMessages={messages.length > 3}>
				{messages.map((msg, index) => {
					const isLast = index === messages.length - 1;
					const showLoaderInsideBubble = isLast && isSending && msg.bot;

					const shouldApplyGlass = index < messages.length - 3 && inView;

					return (
						<ChatMessage
							key={index}
							ref={ref}
							{...msg}
							isThinking={showLoaderInsideBubble}
							shouldApplyGlass={shouldApplyGlass}
						/>
					);
				})}
				<div ref={bottomRef} />
			</ChatMessageListWrapper>
		</OuterBox>
	);
};
