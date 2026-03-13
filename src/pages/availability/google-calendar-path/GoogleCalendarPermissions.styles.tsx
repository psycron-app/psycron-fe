import { Box, Button, styled, Typography } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const PermissionsCard = styled(Box)`
	background-color: rgba(139, 92, 246, 0.06);
	border: 1px solid rgba(139, 92, 246, 0.15);
	border-radius: 16px;
	padding: ${spacing.mediumSmall};
	max-width: 400px;
	align-self: flex-start;

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	animation: slideIn 300ms ease-out;
`;

export const PermissionsIntro = styled(Typography)`
	font-size: 14px;
	font-weight: 600;
	color: ${palette.text.primary};
	margin-bottom: ${spacing.extraSmall};
`;

export const PermissionItem = styled(Box)`
	display: flex;
	align-items: center;
	gap: ${spacing.xs};
	padding: 6px 0;
	font-size: 13px;
	color: ${palette.text.primary};

	&::before {
		content: '✓';
		color: ${palette.brand.purple};
		font-weight: 700;
		font-size: 14px;
	}
`;

export const PrivacyNote = styled(Typography)`
	font-size: 12px;
	color: ${palette.text.secondary};
	margin-top: ${spacing.extraSmall};
	margin-bottom: ${spacing.small};
	font-style: italic;
`;

export const ButtonRow = styled(Box)`
	display: flex;
	gap: ${spacing.xs};
	margin-top: ${spacing.xs};
`;

export const BackButton = styled(Button)`
	border-radius: 20px;
	padding: 8px 16px;
	font-size: 13px;
	font-weight: 500;
	text-transform: none;
	color: ${palette.text.secondary};

	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
`;

export const ContinueBtn = styled(Button)`
	border-radius: 20px;
	padding: 8px 20px;
	font-size: 14px;
	font-weight: 600;
	text-transform: none;
	background-color: ${palette.brand.purple};
	color: #fff;
	flex: 1;

	&:hover {
		background-color: ${palette.brand.dark};
	}
`;
