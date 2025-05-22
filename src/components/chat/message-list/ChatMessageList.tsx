import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

import { ChatMessage } from '../message/ChatMessage';
import type { IChatMessage } from '../message/ChatMessage.types';

export interface IChatMessageList {
	messages: IChatMessage[];
}

export const ChatMessageList = ({ messages }: IChatMessageList) => {
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<Box>
			<Box
				sx={{
					flex: 1,
					overflowY: 'auto',
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					padding: 2,
				}}
			>
				{messages.map((msg, index) => (
					<ChatMessage key={index} {...msg} />
				))}
			</Box>
			<div ref={bottomRef} />
		</Box>
	);
};
