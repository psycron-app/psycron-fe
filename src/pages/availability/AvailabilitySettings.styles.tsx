import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { hexToRgba, palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const SettingsWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.medium};
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
	padding: ${spacing.medium} ${spacing.small};
`;

export const LiveAlert = styled(Box)`
	display: flex;
	align-items: flex-start;
	gap: ${spacing.small};
	padding: ${spacing.small} ${spacing.mediumSmall};
	background-color: ${hexToRgba(palette.success.main, 0.08)};
	border: 1px solid ${hexToRgba(palette.success.main, 0.25)};
	border-radius: 12px;
	font-size: 14px;
	color: ${palette.text.primary};
	line-height: 1.5;
`;

export const LiveDot = styled(Box)`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${palette.success.main};
	flex-shrink: 0;
	margin-top: 4px;
`;

export const SettingsCard = styled(Box)`
	border-radius: 16px;
	border: 1px solid ${hexToRgba(palette.brand.purple, 0.15)};
	padding: ${spacing.mediumSmall};
	display: flex;
	flex-direction: column;
	gap: ${spacing.xs};
`;

export const SettingsCardTitle = styled(Typography)`
	font-size: 15px;
	font-weight: 700;
	color: ${palette.text.primary};
	margin-bottom: ${spacing.extraSmall};
`;

export const SettingsRow = styled(Box)`
	display: flex;
	align-items: flex-start;
	gap: ${spacing.xs};
	font-size: 14px;
	line-height: 1.5;
`;

export const SettingsDot = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'dotColor',
})<{ dotColor: string }>`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: ${({ dotColor }) => dotColor};
	flex-shrink: 0;
	margin-top: 4px;
`;

export const SettingsLabel = styled(Typography)`
	font-size: 13px;
	font-weight: 600;
	color: ${palette.text.secondary};
	width: 130px;
	flex-shrink: 0;
`;

export const SettingsValue = styled(Typography)`
	font-size: 14px;
	color: ${palette.text.primary};
`;

export const JupiterCta = styled(Button)`
	border-radius: 40px;
	border: 2px solid ${palette.brand.purple};
	background-color: ${palette.background.default};
	color: ${palette.text.primary};
	font-size: 15px;
	font-weight: 500;
	padding: ${spacing.xs} ${spacing.mediumSmall};
	text-transform: none;
	align-self: flex-start;

	transition: all 0.2s ease;

	&:hover {
		background-color: ${palette.brand.light};
		border-color: ${palette.brand.dark};
	}
`;
