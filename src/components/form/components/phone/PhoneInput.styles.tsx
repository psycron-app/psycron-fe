import styled from '@emotion/styled';
import { hexToRgba, palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { StyledPhoneInputProps } from './PhoneInput.types';

export const StyledPhoneInput = styled.div<StyledPhoneInputProps>`
	display: flex;
	align-items: center;
	padding: 0 ${spacing.small};
	border-radius: calc(2 * ${spacing.mediumSmall});

	background-color: ${({ isDisabled }) =>
		isDisabled ? palette.tertiary.action.disabled : palette.background.default};

	color: ${palette.text.primary};

	height: 50px;
	width: 100%;

	border: 1px solid
		${({ hasError, isDisabled, isFocused }) => {
			if (isDisabled) return palette.tertiary.action.disabled;
			if (hasError) return palette.error.main;
			if (isFocused) return palette.brand.purple;
			return palette.brand.purple;
		}};

	&:hover {
		border-color: ${({ hasError, isDisabled }) => {
			if (isDisabled) return palette.tertiary.action.disabled;
			if (hasError) return palette.error.main;
			return palette.tertiary.main;
		}};
	}

	${({ isFocused, isDisabled }) =>
		isFocused &&
		!isDisabled &&
		`
    border-width: 2px;
    box-shadow: 0 0 0 3px ${hexToRgba(palette.brand.purple, 0.18)};
  `}

	.PhoneInputInput {
		flex: 1;
		border: none;
		outline: none;
		background-color: transparent;
		color: ${palette.text.primary};
		font-size: 16px;
		padding-left: ${spacing.xs};
	}

	.PhoneInputCountry {
		margin-right: ${spacing.xs};
	}

	.PhoneInputCountryIcon--border {
		box-shadow: none;
		background-color: transparent;
	}

	.PhoneInputCountryIconImg {
		border-radius: 20%;
	}

	.PhoneInputCountrySelectArrow {
		margin-left: ${spacing.xs};
	}
`;
