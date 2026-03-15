import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { getAvailability } from '@psycron/api/availability';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';
import { AVAILABILITYGENERATE } from '@psycron/pages/urls';
import { palette } from '@psycron/theme/palette/palette.theme';
import { useQuery } from '@tanstack/react-query';

import {
	JupiterCta,
	LiveAlert,
	LiveDot,
	SettingsCard,
	SettingsCardTitle,
	SettingsDot,
	SettingsLabel,
	SettingsRow,
	SettingsValue,
	SettingsWrapper,
} from './AvailabilitySettings.styles';

export const AvailabilitySettings = () => {
	const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();

	// TODO PR-259: getAvailability stub gracefully returns null until BE endpoint
	// exists. setQueryData in useJupiterFlow.handlePublish populates the cache
	// in-session. Once PR-259 lands the real API response takes over automatically.
	const { data: availability, isLoading } = useQuery({
		queryKey: ['availability'],
		queryFn: getAvailability,
		retry: false,
	});

	const rows = useMemo(
		() =>
			availability
				? [
						{
							dotColor: palette.primary.main,
							label: t('jupiter.preview.label-days'),
							value: availability.workingDays.map((day) => t(`jupiter.days.${day}`)).join(', '),
						},
						{
							dotColor: palette.secondary.main,
							label: t('jupiter.preview.label-hours'),
							value: availability.timeRange,
						},
						{
							dotColor: palette.tertiary.main,
							label: t('jupiter.preview.label-duration'),
							value: availability.sessionDuration,
						},
						{
							dotColor: palette.success.main,
							label: t('jupiter.preview.label-session-type'),
							value: t(`jupiter.session-type.${availability.sessionType}`),
						},
						{
							dotColor: palette.info.main,
							label: t('jupiter.preview.label-timezone'),
							value: availability.timezone,
						},
					]
				: [],
		[availability, t]
	);

	if (isLoading) return null;

	if (!availability) {
		return <Navigate to={`/${locale}/${AVAILABILITYGENERATE}`} replace />;
	}

	return (
		<PageLayout title={t('availability.settings.page-title')} isLoading={false}>
			<SettingsWrapper>
				<LiveAlert>
					<LiveDot />
					{t('availability.settings.live-alert')}
				</LiveAlert>

				<SettingsCard>
					<SettingsCardTitle>{t('jupiter.preview.title')}</SettingsCardTitle>

					{rows.map(({ dotColor, label, value }) => (
						<SettingsRow key={label}>
							<SettingsDot dotColor={dotColor} />
							<SettingsLabel>{label}</SettingsLabel>
							<SettingsValue>{value}</SettingsValue>
						</SettingsRow>
					))}
				</SettingsCard>

				<JupiterCta href={`/${locale}/${AVAILABILITYGENERATE}`}>
					{t('availability.settings.talk-to-jupiter')}
				</JupiterCta>
			</SettingsWrapper>
		</PageLayout>
	);
};
