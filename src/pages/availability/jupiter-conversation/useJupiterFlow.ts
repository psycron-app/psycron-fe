import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
	JupiterAnswers,
	JupiterMessage,
	JupiterStep,
} from './JupiterConversation.types';

const WEEKDAY_KEY_MAP: Record<string, string> = {
	'chip-mon': 'MONDAY',
	'chip-tue': 'TUESDAY',
	'chip-wed': 'WEDNESDAY',
	'chip-thu': 'THURSDAY',
	'chip-fri': 'FRIDAY',
	'chip-sat': 'SATURDAY',
	'chip-sun': 'SUNDAY',
};

export const useJupiterFlow = () => {
	const { t } = useTranslation();
	const [step, setStep] = useState<JupiterStep>('calendar-choice');
	const [answers, setAnswers] = useState<JupiterAnswers>({});
	const [messages, setMessages] = useState<JupiterMessage[]>([]);
	const [isPublishing, setIsPublishing] = useState(false);

	const detectedTimezone = useMemo(
		() => Intl.DateTimeFormat().resolvedOptions().timeZone,
		[]
	);

	const addBotMessage = useCallback(
		(content: string, showIcon = true) => {
			setMessages((prev) => [...prev, { content, sender: 'bot', showIcon }]);
		},
		[]
	);

	const addUserMessage = useCallback((content: string) => {
		setMessages((prev) => [...prev, { content, sender: 'user' }]);
	}, []);

	const initFlow = useCallback(() => {
		addBotMessage(t('jupiter.calendar-choice.msg1'));

		setTimeout(() => {
			addBotMessage(t('jupiter.calendar-choice.msg2'), false);
		}, 300);
	}, [addBotMessage, t]);

	const handleCalendarChoice = useCallback(
		(key: string) => {
			if (key === 'google') {
				addUserMessage(t('jupiter.calendar-choice.chip-google'));
				setAnswers((prev) => ({ ...prev, calendarChoice: 'google' }));
				setStep('google-permissions');
			} else {
				addUserMessage(t('jupiter.calendar-choice.chip-manual'));
				setAnswers((prev) => ({ ...prev, calendarChoice: 'manual' }));

				setTimeout(() => {
					addBotMessage(t('jupiter.working-days.response'));
					setStep('working-days');
				}, 300);
			}
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleWorkingDays = useCallback(
		(selectedKeys: string[]) => {
			const dayLabels = selectedKeys
				.map((key) => t(`jupiter.working-days.${key}`))
				.join(', ');

			const canonicalDays = selectedKeys.map(
				(key) => WEEKDAY_KEY_MAP[key] ?? key
			);

			addUserMessage(dayLabels);
			setAnswers((prev) => ({ ...prev, workingDays: canonicalDays }));

			setTimeout(() => {
				addBotMessage(t('jupiter.time-range.response'));
				setStep('time-range');
			}, 300);
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleTimeRange = useCallback(
		(key: string) => {
			const label =
				key === 'custom'
					? key
					: t(`jupiter.time-range.${key}`);

			addUserMessage(label);
			setAnswers((prev) => ({ ...prev, timeRange: label }));

			setTimeout(() => {
				addBotMessage(t('jupiter.session-duration.response'));
				setStep('session-duration');
			}, 300);
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleTimeRangeCustom = useCallback(
		(text: string) => {
			addUserMessage(text);
			setAnswers((prev) => ({ ...prev, timeRange: text }));

			setTimeout(() => {
				addBotMessage(t('jupiter.session-duration.response'));
				setStep('session-duration');
			}, 300);
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleSessionDuration = useCallback(
		(key: string) => {
			const label = t(`jupiter.session-duration.${key}`);
			addUserMessage(label);
			setAnswers((prev) => ({ ...prev, sessionDuration: label }));

			setTimeout(() => {
				addBotMessage(t('jupiter.session-type.response'));
				setStep('session-type');
			}, 300);
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleSessionDurationCustom = useCallback(
		(text: string) => {
			addUserMessage(text);
			setAnswers((prev) => ({ ...prev, sessionDuration: text }));

			setTimeout(() => {
				addBotMessage(t('jupiter.session-type.response'));
				setStep('session-type');
			}, 300);
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleSessionType = useCallback(
		(key: string) => {
			const label = t(`jupiter.session-type.${key}`);
			addUserMessage(label);
			setAnswers((prev) => ({ ...prev, sessionType: label }));

			setTimeout(() => {
				addBotMessage(t('jupiter.timezone.response'));
				setStep('timezone');
			}, 300);
		},
		[addBotMessage, addUserMessage, t]
	);

	const handleTimezone = useCallback(
		(key: string) => {
			if (key === 'chip-yes') {
				addUserMessage(t('jupiter.timezone.chip-yes'));
				setAnswers((prev) => ({
					...prev,
					timezoneConfirmed: true,
					timezone: detectedTimezone,
				}));

				setTimeout(() => {
					setStep('preview');
				}, 300);
			} else {
				addUserMessage(t('jupiter.timezone.chip-no'));
				addBotMessage(t('jupiter.timezone.follow-up'));
				setAnswers((prev) => ({
					...prev,
					timezoneConfirmed: false,
				}));
			}
		},
		[addBotMessage, addUserMessage, detectedTimezone, t]
	);

	const handleTimezoneSelect = useCallback(
		(tz: string) => {
			addUserMessage(tz);
			setAnswers((prev) => ({ ...prev, timezone: tz }));

			setTimeout(() => {
				setStep('preview');
			}, 300);
		},
		[addUserMessage]
	);

	const handlePublish = useCallback(async () => {
		setIsPublishing(true);
		// TODO: integrate with actual availability API
		// await completeSessionAvailability(answers);
		setIsPublishing(false);
	}, []);

	const handleGoogleContinue = useCallback(() => {
		// TODO: trigger Google OAuth flow
		setStep('google-success');
	}, []);

	const handleGoogleBack = useCallback(() => {
		setStep('calendar-choice');
	}, []);

	const handleGooglePostConnect = useCallback(
		(key: string) => {
			if (key === 'chip-use-existing') {
				addUserMessage(t('jupiter.google-calendar.chip-use-existing'));
				// TODO: import from Google Calendar
				setStep('preview');
			} else {
				addUserMessage(t('jupiter.google-calendar.chip-define-hours'));

				setTimeout(() => {
					addBotMessage(t('jupiter.working-days.response'));
					setStep('working-days');
				}, 300);
			}
		},
		[addBotMessage, addUserMessage, t]
	);

	return {
		step,
		answers,
		messages,
		isPublishing,
		detectedTimezone,
		initFlow,
		handleCalendarChoice,
		handleWorkingDays,
		handleTimeRange,
		handleTimeRangeCustom,
		handleSessionDuration,
		handleSessionDurationCustom,
		handleSessionType,
		handleTimezone,
		handleTimezoneSelect,
		handlePublish,
		handleGoogleContinue,
		handleGoogleBack,
		handleGooglePostConnect,
	};
};
