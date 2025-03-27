import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const CountryFlag = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: ${spacing.small};

	span {
		font-size: 1.2rem;
	}
	svg {
		color: ${palette.primary.main};
	}
`;

export const PhoneNumberField = styled(TextField)`
	& input[type='tel'] {
		appearance: textfield; /* Firefox */
	}

	& input[type='tel']::-webkit-outer-spin-button,
	& input[type='tel']::-webkit-inner-spin-button {
		-webkit-appearance: none; /* Chrome, Safari, Edge */
		margin: 0;
	}
	margin-top: ${spacing.small};
`;
