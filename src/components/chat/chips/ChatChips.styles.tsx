import { Box, Button, css, styled, TextField } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

const CHIP_PURPLE = 'rgba(139, 92, 246, 0.3)';
const CHIP_PURPLE_HOVER = 'rgba(139, 92, 246, 0.6)';
const CHIP_PURPLE_SELECTED = 'rgba(139, 92, 246, 0.12)';

export const ChipsContainer = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	gap: ${spacing.xs};
	padding: ${spacing.xs} 0;
	align-items: center;

	@keyframes chipFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	animation: chipFadeIn 200ms ease-out;
`;

export const ChipButton = styled(Button, {
	shouldForwardProp: (prop) =>
		prop !== 'isSelected' && prop !== 'chipVariant',
})<{
	chipVariant?: 'primary' | 'secondary' | 'outline' | 'danger';
	isSelected?: boolean;
}>`
	border-radius: 20px;
	padding: 8px 16px;
	font-size: 13px;
	font-weight: 500;
	text-transform: none;
	min-height: 36px;
	line-height: 1.4;
	transition: all 200ms ease-out;
	white-space: nowrap;

	${({ chipVariant, isSelected }) => {
		if (chipVariant === 'danger') {
			return css`
				border: 1.5px solid rgba(239, 68, 68, 0.3);
				background-color: transparent;
				color: ${palette.text.primary};

				&:hover {
					border-color: rgba(239, 68, 68, 0.6);
					background-color: rgba(239, 68, 68, 0.06);
				}
			`;
		}

		if (chipVariant === 'primary') {
			return css`
				border: 1.5px solid ${palette.brand.purple};
				background-color: ${CHIP_PURPLE_SELECTED};
				color: ${palette.brand.purple};
				font-weight: 600;

				&:hover {
					background-color: rgba(139, 92, 246, 0.18);
					border-color: ${palette.brand.dark};
				}
			`;
		}

		if (isSelected) {
			return css`
				border: 1.5px solid ${CHIP_PURPLE_HOVER};
				background-color: ${CHIP_PURPLE_SELECTED};
				color: ${palette.brand.purple};
				font-weight: 600;

				&:hover {
					background-color: rgba(139, 92, 246, 0.18);
				}
			`;
		}

		return css`
			border: 1.5px solid ${CHIP_PURPLE};
			background-color: transparent;
			color: ${palette.text.primary};

			&:hover {
				border-color: ${CHIP_PURPLE_HOVER};
				background-color: rgba(139, 92, 246, 0.04);
			}
		`;
	}}

	&:disabled {
		opacity: 0.4;
		pointer-events: none;
	}
`;

export const ContinueButton = styled(Button)`
	border-radius: 20px;
	padding: 8px 20px;
	font-size: 14px;
	font-weight: 600;
	text-transform: none;
	min-height: 36px;
	background-color: ${palette.brand.purple};
	color: #fff;
	border: none;
	transition: all 200ms ease-out;

	animation: chipFadeIn 200ms ease-out;

	@keyframes chipFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	&:hover {
		background-color: ${palette.brand.dark};
	}

	&:disabled {
		opacity: 0.5;
		background-color: ${palette.brand.purple};
		color: #fff;
	}
`;

export const OtherInput = styled(TextField)`
	margin-top: ${spacing.xs};
	width: 100%;

	& .MuiOutlinedInput-root {
		border-radius: 12px;
		font-size: 13px;

		& fieldset {
			border-color: ${CHIP_PURPLE};
		}

		&:hover fieldset {
			border-color: ${CHIP_PURPLE_HOVER};
		}

		&.Mui-focused fieldset {
			border-color: ${palette.brand.purple};
		}
	}
`;

export const ChipsFadeOut = styled(Box)`
	@keyframes chipsFadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
			height: 0;
			overflow: hidden;
		}
	}

	animation: chipsFadeOut 200ms ease-out forwards;
`;
