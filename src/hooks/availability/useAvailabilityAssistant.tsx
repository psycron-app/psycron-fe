import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	collectAvailabilityStepWithChatGPTStreamed,
	getAvailabilityThreadById,
} from '@psycron/api/openai';
import type { IAvailabilityDraft } from '@psycron/api/openai/index.types';
import type { IChatMessage } from '@psycron/components/chat/message/ChatMessage.types';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { AVAILABILITY_THREAD_ID } from '@psycron/utils/tokens';
import { useQuery } from '@tanstack/react-query';

const useStaticMessages = (): IChatMessage[] => {
	const { t } = useTranslation();

	return useMemo(
		() => [
			{ role: 'assistant', message: t('chat.greeting'), bot: true, icon: true },
			{
				role: 'assistant',
				message: t('chat.let-start'),
				bot: true,
				icon: true,
			},
		],
		[t]
	);
};

const formatThreadMessages = (messages: IChatMessage[]): IChatMessage[] =>
	messages.map((msg) => ({
		...msg,
		bot: msg.role === 'assistant',
		icon: msg.role === 'assistant',
	}));

export const useAvailabilityAssistant = () => {
	const { showAlert } = useAlert();
	const { t } = useTranslation();
	const staticMessages = useStaticMessages();
	const [messages, setMessages] = useState<IChatMessage[]>(staticMessages);
	const [availabilityDraft, setAvailabilityDraft] =
		useState<IAvailabilityDraft>({
			therapySettings: [],
		});
	const [threadId, setThreadId] = useState<string | null>(null);
	const [isDraftComplete, setIsDraftComplete] = useState<boolean>(false);
	const [isSending, setIsSending] = useState<boolean>(false);

	const storedThreadId = useMemo(
		() => localStorage.getItem(AVAILABILITY_THREAD_ID),
		[]
	);

	const { data: threadData, isLoading: isLoadingThread } = useQuery({
		queryKey: ['availabilityAssistantHist', storedThreadId],
		queryFn: () => getAvailabilityThreadById(storedThreadId!),
		enabled: !!storedThreadId,
	});

	useEffect(() => {
		if (!threadData) return;

		const fullConversation = [
			...staticMessages,
			...formatThreadMessages(
				threadData.messages.filter(
					(msg) => !staticMessages.some((s) => s.message === msg.message)
				)
			),
		];

		setMessages(fullConversation);
		setAvailabilityDraft(threadData.latestDraft);
		setThreadId(threadData.threadId);
		setIsDraftComplete(threadData.isDraftComplete);
	}, [threadData, staticMessages]);

	const sendMessage = async (text: string) => {
		const userMessage: IChatMessage = {
			message: text,
			role: 'user',
			bot: false,
		};

		setMessages((prev) => [
			...prev,
			userMessage,
			{ role: 'assistant', message: '', bot: true, icon: true },
		]);

		setIsSending(true);

		try {
			await collectAvailabilityStepWithChatGPTStreamed(text, (token) => {
				setMessages((prev) => {
					const updated = [...prev];
					const lastIndex = updated.length - 1;
					const last = updated[lastIndex];

					updated[lastIndex] = {
						...last,
						message: last.message + token,
					};

					return updated;
				});
			});
		} catch (err) {
			showAlert({
				message: t('chat.error'),
				severity: 'error',
			});
		} finally {
			setIsSending(false);
		}
	};
	return {
		messages,
		sendMessage,
		isSending,
		availabilityDraft,
		threadId,
		isDraftComplete,
		isLoadingThread,
	};
};
