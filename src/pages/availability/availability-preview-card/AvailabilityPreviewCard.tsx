import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';

import {
	PreviewCardWrapper,
	PreviewFooter,
	PreviewLabel,
	PreviewRow,
	PreviewTitle,
	PreviewValue,
	PublishButton,
} from './AvailabilityPreviewCard.styles';
import type { IAvailabilityPreviewCardProps } from './AvailabilityPreviewCard.types';

export const AvailabilityPreviewCard = ({
	answers,
	detectedTimezone,
	isPublishing,
	onPublish,
}: IAvailabilityPreviewCardProps) => {
	const { t } = useTranslation();

	const daysDisplay = answers.workingDays?.join(', ') ?? '—';
	const timezone = answers.timezone ?? detectedTimezone;

	return (
		<PreviewCardWrapper>
			<PreviewTitle>{t('jupiter.preview.title')}</PreviewTitle>

			<PreviewRow>
				<PreviewLabel>{t('jupiter.preview.label-days')}</PreviewLabel>
				<PreviewValue>{daysDisplay}</PreviewValue>
			</PreviewRow>

			<PreviewRow>
				<PreviewLabel>{t('jupiter.preview.label-hours')}</PreviewLabel>
				<PreviewValue>{answers.timeRange ?? '—'}</PreviewValue>
			</PreviewRow>

			<PreviewRow>
				<PreviewLabel>
					{t('jupiter.preview.label-duration')}
				</PreviewLabel>
				<PreviewValue>
					{answers.sessionDuration ?? '—'}
				</PreviewValue>
			</PreviewRow>

			<PreviewRow>
				<PreviewLabel>
					{t('jupiter.preview.label-session-type')}
				</PreviewLabel>
				<PreviewValue>{answers.sessionType ?? '—'}</PreviewValue>
			</PreviewRow>

			<PreviewRow>
				<PreviewLabel>
					{t('jupiter.preview.label-timezone')}
				</PreviewLabel>
				<PreviewValue>{timezone}</PreviewValue>
			</PreviewRow>

			<PreviewFooter>{t('jupiter.preview.footer')}</PreviewFooter>

			<PublishButton
				onClick={onPublish}
				disabled={isPublishing}
				startIcon={
					isPublishing ? (
						<CircularProgress size={16} color='inherit' />
					) : undefined
				}
			>
				{isPublishing
					? t('jupiter.preview.loading')
					: t('jupiter.preview.cta')}
			</PublishButton>
		</PreviewCardWrapper>
	);
};
