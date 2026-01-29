import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { PillTone } from './SubscriptionSectionContent.types';

export const SubscriptionEmptyState = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	width: 100%;
`;

export const SubscriptionCard = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	width: 100%;

	padding: ${spacing.small};
	border-radius: ${spacing.small};

	/* Soft gray content block */
	background-color: ${palette.gray['01']};
	border: 1px solid ${palette.gray['02']};
`;

export const SubscriptionHeader = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.xs};
`;

export const SubscriptionMeta = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${spacing.small};
	flex-wrap: wrap;
`;

const toneStyles: Record<
	PillTone,
	{ bg: string; border: string; text: string }
> = {
	success: {
		bg: palette.success.light,
		border: palette.success.main,
		text: palette.success.main,
	},
	neutral: {
		bg: palette.tertiary.light,
		border: palette.tertiary.main,
		text: palette.tertiary.dark,
	},
};

export const SubscriptionPill = styled(Text)<{ tone?: PillTone }>`
	width: fit-content;
	padding: ${spacing.xs} ${spacing.small};
	border-radius: ${spacing.small};
	border: 2px solid ${({ tone = 'neutral' }) => toneStyles[tone].border};
	background-color: ${({ tone = 'neutral' }) => toneStyles[tone].bg};
	color: ${({ tone = 'neutral' }) => toneStyles[tone].text};
	font-weight: 600;
`;
