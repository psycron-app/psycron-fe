import { Box, Button, styled, Typography } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const PreviewCardWrapper = styled(Box)`
	background-color: rgba(139, 92, 246, 0.06);
	border: 1px solid rgba(139, 92, 246, 0.15);
	border-radius: 16px;
	padding: ${spacing.mediumSmall};
	max-width: 400px;
	align-self: flex-start;

	@keyframes previewSlideIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	animation: previewSlideIn 300ms ease-out;
`;

export const PreviewTitle = styled(Typography)`
	font-size: 16px;
	font-weight: 700;
	color: ${palette.text.primary};
	margin-bottom: ${spacing.small};
`;

export const PreviewRow = styled(Box)`
	display: flex;
	gap: ${spacing.xs};
	margin-bottom: ${spacing.xs};
	font-size: 14px;
	line-height: 1.5;
`;

export const PreviewLabel = styled(Typography)`
	font-size: 13px;
	font-weight: 600;
	color: ${palette.text.secondary};
	min-width: 120px;
`;

export const PreviewValue = styled(Typography)`
	font-size: 13px;
	color: ${palette.text.primary};
`;

export const PreviewFooter = styled(Typography)`
	font-size: 12px;
	color: ${palette.text.secondary};
	margin-top: ${spacing.small};
	margin-bottom: ${spacing.small};
`;

export const PublishButton = styled(Button)`
	border-radius: 20px;
	padding: 10px 24px;
	font-size: 14px;
	font-weight: 600;
	text-transform: none;
	background-color: ${palette.brand.purple};
	color: #fff;
	width: 100%;
	min-height: 44px;

	transition: all 200ms ease-out;

	&:hover {
		background-color: ${palette.brand.dark};
	}

	&:disabled {
		opacity: 0.7;
		background-color: ${palette.brand.purple};
		color: #fff;
	}
`;
