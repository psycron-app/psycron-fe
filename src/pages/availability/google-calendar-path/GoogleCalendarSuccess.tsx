import { useTranslation } from 'react-i18next';
import type { IChipOption } from '@psycron/components/chat/chips/ChatChips.types';
import { SingleSelectChips } from '@psycron/components/chat/chips/SingleSelectChips';

import {
	BotBubble,
	BotMessageGroup,
	ChipsInline,
	IconRow,
} from '../jupiter-conversation/JupiterConversation.styles';

interface GoogleCalendarSuccessProps {
	isImporting?: boolean;
	onSelect: (key: string) => void;
}

export const GoogleCalendarSuccess = ({
	isImporting = false,
	onSelect,
}: GoogleCalendarSuccessProps) => {
	const { t } = useTranslation();

	const postConnectOptions: IChipOption[] = [
		{
			key: 'chip-use-existing',
			label: t('jupiter.google-calendar.chip-use-existing'),
			variant: 'primary',
		},
		{
			key: 'chip-define-hours',
			label: t('jupiter.google-calendar.chip-define-hours'),
			variant: 'secondary',
		},
	];

	return (
		<>
			<BotMessageGroup>
				<IconRow showIcon={false}>
					<BotBubble isFirst={false}>
						{t('jupiter.google-calendar.success-line1')}
					</BotBubble>
				</IconRow>
			</BotMessageGroup>

			<BotMessageGroup>
				<IconRow showIcon={false}>
					<BotBubble isFirst={false}>
						{t('jupiter.google-calendar.success-line2')}
					</BotBubble>
				</IconRow>
			</BotMessageGroup>

			<BotMessageGroup>
				<IconRow showIcon={false}>
					<BotBubble isFirst={false}>
						{t('jupiter.google-calendar.success-line3')}
					</BotBubble>
				</IconRow>
			</BotMessageGroup>

			<BotMessageGroup>
				<IconRow showIcon={false}>
					<BotBubble isFirst={false}>
						{t('jupiter.google-calendar.next-choice')}
					</BotBubble>
				</IconRow>
			</BotMessageGroup>

			{!isImporting && (
				<ChipsInline>
					<SingleSelectChips
						options={postConnectOptions}
						onSelect={onSelect}
					/>
				</ChipsInline>
			)}
		</>
	);
};
