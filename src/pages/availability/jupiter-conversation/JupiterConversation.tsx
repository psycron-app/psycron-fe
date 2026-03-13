import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OtherInput } from '@psycron/components/chat/chips/ChatChips.styles';
import type { IChipOption } from '@psycron/components/chat/chips/ChatChips.types';
import { MultiSelectChips } from '@psycron/components/chat/chips/MultiSelectChips';
import { SingleSelectChips } from '@psycron/components/chat/chips/SingleSelectChips';
import { Jupiter } from '@psycron/components/icons';

import { AvailabilityPreviewCard } from '../availability-preview-card/AvailabilityPreviewCard';
import { GoogleCalendarPermissions } from '../google-calendar-path/GoogleCalendarPermissions';
import { GoogleCalendarSuccess } from '../google-calendar-path/GoogleCalendarSuccess';

import {
	BotBubble,
	BotMessageGroup,
	ChipsInline,
	ConversationContainer,
	IconRow,
	UserBubble,
	UserMessageGroup,
} from './JupiterConversation.styles';
import { useJupiterFlow } from './useJupiterFlow';

const JupiterIcon = () => (
	<div
		style={{
			minWidth: 32,
			height: 32,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<Jupiter />
	</div>
);

export const JupiterConversation = () => {
	const { t } = useTranslation();
	const bottomRef = useRef<HTMLDivElement | null>(null);

	const [customInputFor, setCustomInputFor] = useState<string | null>(null);
	const [customValue, setCustomValue] = useState('');

	const {
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
	} = useJupiterFlow();

	useEffect(() => {
		initFlow();
	}, [initFlow]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, step]);

	const calendarChipOptions: IChipOption[] = [
		{
			key: 'google',
			label: t('jupiter.calendar-choice.chip-google'),
			variant: 'primary',
		},
		{
			key: 'manual',
			label: t('jupiter.calendar-choice.chip-manual'),
			variant: 'secondary',
		},
	];

	const dayChipOptions: IChipOption[] = [
		{ key: 'chip-mon', label: t('jupiter.working-days.chip-mon') },
		{ key: 'chip-tue', label: t('jupiter.working-days.chip-tue') },
		{ key: 'chip-wed', label: t('jupiter.working-days.chip-wed') },
		{ key: 'chip-thu', label: t('jupiter.working-days.chip-thu') },
		{ key: 'chip-fri', label: t('jupiter.working-days.chip-fri') },
		{ key: 'chip-sat', label: t('jupiter.working-days.chip-sat') },
		{ key: 'chip-sun', label: t('jupiter.working-days.chip-sun') },
	];

	const timeRangeOptions: IChipOption[] = [
		{ key: 'chip-1', label: t('jupiter.time-range.chip-1') },
		{ key: 'chip-2', label: t('jupiter.time-range.chip-2') },
		{ key: 'chip-3', label: t('jupiter.time-range.chip-3') },
		{
			key: 'chip-custom',
			label: t('jupiter.time-range.chip-custom'),
			variant: 'outline',
		},
	];

	const durationOptions: IChipOption[] = [
		{ key: 'chip-45', label: t('jupiter.session-duration.chip-45') },
		{ key: 'chip-60', label: t('jupiter.session-duration.chip-60') },
		{
			key: 'chip-custom',
			label: t('jupiter.session-duration.chip-custom'),
			variant: 'outline',
		},
	];

	const sessionTypeOptions: IChipOption[] = [
		{
			key: 'chip-online',
			label: t('jupiter.session-type.chip-online'),
		},
		{
			key: 'chip-in-person',
			label: t('jupiter.session-type.chip-in-person'),
		},
		{ key: 'chip-both', label: t('jupiter.session-type.chip-both') },
	];

	const timezoneOptions: IChipOption[] = [
		{
			key: 'chip-yes',
			label: t('jupiter.timezone.chip-yes'),
			variant: 'primary',
		},
		{
			key: 'chip-no',
			label: t('jupiter.timezone.chip-no'),
			variant: 'danger',
		},
	];

	const renderStepChips = () => {
		switch (step) {
		case 'calendar-choice':
			return (
				<ChipsInline>
					<SingleSelectChips
						options={calendarChipOptions}
						onSelect={handleCalendarChoice}
					/>
				</ChipsInline>
			);

		case 'working-days':
			return (
				<ChipsInline>
					<MultiSelectChips
						options={dayChipOptions}
						onConfirm={handleWorkingDays}
						confirmLabel={t('jupiter.working-days.continue')}
						otherPlaceholder={t(
							'jupiter.working-days.other-placeholder'
						)}
					/>
				</ChipsInline>
			);

		case 'time-range':
			if (customInputFor === 'time-range') {
				return (
					<ChipsInline>
						<OtherInput
							size='small'
							placeholder={t('jupiter.time-range.chip-custom')}
							value={customValue}
							onChange={(e) => setCustomValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && customValue.trim()) {
									handleTimeRangeCustom(customValue.trim());
									setCustomInputFor(null);
									setCustomValue('');
								}
							}}
							autoFocus
						/>
					</ChipsInline>
				);
			}
			return (
				<ChipsInline>
					<SingleSelectChips
						options={timeRangeOptions}
						onSelect={(key) => {
							if (key === 'chip-custom') {
								setCustomInputFor('time-range');
								return;
							}
							handleTimeRange(key);
						}}
					/>
				</ChipsInline>
			);

		case 'session-duration':
			if (customInputFor === 'session-duration') {
				return (
					<ChipsInline>
						<OtherInput
							size='small'
							placeholder={t('jupiter.session-duration.chip-custom')}
							value={customValue}
							onChange={(e) => setCustomValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && customValue.trim()) {
									handleSessionDurationCustom(customValue.trim());
									setCustomInputFor(null);
									setCustomValue('');
								}
							}}
							autoFocus
						/>
					</ChipsInline>
				);
			}
			return (
				<ChipsInline>
					<SingleSelectChips
						options={durationOptions}
						onSelect={(key) => {
							if (key === 'chip-custom') {
								setCustomInputFor('session-duration');
								return;
							}
							handleSessionDuration(key);
						}}
					/>
				</ChipsInline>
			);

		case 'session-type':
			return (
				<ChipsInline>
					<SingleSelectChips
						options={sessionTypeOptions}
						onSelect={handleSessionType}
					/>
				</ChipsInline>
			);

		case 'timezone':
			if (answers.timezoneConfirmed === false) {
				return (
					<ChipsInline>
						<OtherInput
							size='small'
							placeholder={detectedTimezone}
							value={customValue}
							onChange={(e) => setCustomValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && customValue.trim()) {
									handleTimezoneSelect(customValue.trim());
									setCustomValue('');
								}
							}}
							autoFocus
						/>
					</ChipsInline>
				);
			}
			return (
				<ChipsInline>
					<SingleSelectChips
						options={timezoneOptions}
						onSelect={handleTimezone}
					/>
				</ChipsInline>
			);

		case 'preview':
			return (
				<AvailabilityPreviewCard
					answers={answers}
					detectedTimezone={detectedTimezone}
					isPublishing={isPublishing}
					onPublish={handlePublish}
				/>
			);

		case 'google-permissions':
			return (
				<GoogleCalendarPermissions
					onContinue={handleGoogleContinue}
					onBack={handleGoogleBack}
				/>
			);

		case 'google-success':
			return (
				<GoogleCalendarSuccess
					onSelect={handleGooglePostConnect}
				/>
			);

		default:
			return null;
		}
	};

	return (
		<ConversationContainer>
			{messages.map((msg, index) =>
				msg.sender === 'bot' ? (
					<BotMessageGroup key={index}>
						<IconRow>
							{msg.showIcon && <JupiterIcon />}
							<BotBubble>{msg.content}</BotBubble>
						</IconRow>
					</BotMessageGroup>
				) : (
					<UserMessageGroup key={index}>
						<UserBubble>{msg.content}</UserBubble>
					</UserMessageGroup>
				)
			)}

			{renderStepChips()}

			<div ref={bottomRef} />
		</ConversationContainer>
	);
};
