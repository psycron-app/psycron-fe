import { css } from '@emotion/react';
import { Box, Button, styled, TextField } from '@mui/material';
import { hexToRgba, palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

// ─── Color tokens (derived from palette) ─────────────────────────────────────

const CHIP_PURPLE = hexToRgba(palette.brand.purple, 0.3);
const CHIP_PURPLE_HOVER = hexToRgba(palette.brand.purple, 0.6);
const CHIP_PURPLE_SELECTED = hexToRgba(palette.brand.purple, 0.12);
const CHIP_PURPLE_HOVER_BG = hexToRgba(palette.brand.purple, 0.18);
const CHIP_PURPLE_SUBTLE_BG = hexToRgba(palette.brand.purple, 0.04);

// ─── Shared animation ────────────────────────────────────────────────────────

const chipFadeInAnimation = css`
	@keyframes chipFadeIn {
		from {
			opacity: 0;
			transform: translateY(${spacing.xs});
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	animation: chipFadeIn 200ms ease-out;
`;

// ─── Chip variant styles ─────────────────────────────────────────────────────

const chipVariantDefault = css`
	border: 2px solid ${CHIP_PURPLE};
	background-color: transparent;
	color: ${palette.text.primary};

	&:hover {
		border-color: ${CHIP_PURPLE_HOVER};
		background-color: ${CHIP_PURPLE_SUBTLE_BG};
	}
`;

const chipVariantPrimary = css`
	border: 2px solid ${palette.brand.purple};
	background-color: ${CHIP_PURPLE_SELECTED};
	color: ${palette.brand.purple};
	font-weight: 600;

	&:hover {
		background-color: ${CHIP_PURPLE_HOVER_BG};
		border-color: ${palette.brand.dark};
	}
`;

const chipVariantSuccess = css`
	border: 2px solid ${palette.success.main};
	font-weight: 500;

	&:hover {
		background-color: ${palette.success.main};
	}
`;

const chipVariantSelected = css`
	border: 2px solid ${CHIP_PURPLE_HOVER};
	background-color: ${CHIP_PURPLE_SELECTED};
	color: ${palette.brand.purple};
	font-weight: 500;

	&:hover {
		background-color: ${CHIP_PURPLE_HOVER_BG};
	}
`;

const chipVariantDanger = css`
	border: 1px solid ${palette.error.main};

	&:hover {
		background-color: ${palette.error.main};
		color: ${palette.background.default};
	}
`;

// ─── Components ──────────────────────────────────────────────────────────────

export const ChipsContainer = styled(Box)`
	display: flex;
	flex-wrap: wrap;
	gap: ${spacing.xs};
	padding: ${spacing.xs} 0;
	align-items: center;
	justify-content: center;

	${chipFadeInAnimation}
`;

export const ChipButton = styled(Button, {
	shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'chipVariant',
})<{
	chipVariant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
	isSelected?: boolean;
}>`
	border-radius: ${spacing.mediumSmall};
	padding: ${spacing.xs} ${spacing.small};
	font-size: 13px;
	font-weight: 500;
	text-transform: none;
	min-height: 36px;
	line-height: 1.4;
	transition: all 200ms ease-out;
	white-space: nowrap;

	${({ chipVariant, isSelected }) => {
		if (chipVariant === 'danger') return chipVariantDanger;
		if (chipVariant === 'primary') return chipVariantPrimary;
		if (chipVariant === 'success') return chipVariantSuccess;
		if (isSelected) return chipVariantSelected;
		return chipVariantDefault;
	}}

	&:disabled {
		opacity: 0.4;
		pointer-events: none;
	}
`;

export const ContinueButton = styled(Button)`
	border-radius: ${spacing.mediumSmall};
	padding: ${spacing.xs} ${spacing.mediumSmall};
	font-size: 14px;
	font-weight: 600;
	text-transform: none;
	min-height: 36px;
	background-color: ${palette.brand.purple};
	color: ${palette.background.default};
	border: none;
	transition: all 200ms ease-out;

	${chipFadeInAnimation}

	&:hover {
		background-color: ${palette.brand.dark};
	}

	&:disabled {
		opacity: 0.5;
		background-color: ${palette.brand.purple};
		color: ${palette.background.default};
	}
`;

export const OtherInput = styled(TextField)`
	margin-top: ${spacing.xs};
	width: 100%;

	& .MuiOutlinedInput-root {
		border-radius: ${spacing.extraSmall};
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
