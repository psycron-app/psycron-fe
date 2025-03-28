import styled from '@emotion/styled';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowInnerPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledPhoneInput = styled.div`
	display: flex;
	align-items: center;
	padding: 0 ${spacing.small};
	border-radius: calc(2 * ${spacing.mediumSmall});
	box-shadow: ${shadowInnerPress};
	background-color: ${palette.background.default};
	color: ${palette.text.primary};
	height: 50px;
	width: 100%;

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
		border-radius: 50%;
	}

	.PhoneInputCountrySelectArrow {
		margin-left: ${spacing.xs};
	}
`;
