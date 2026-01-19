import { FormControlLabel, styled } from '@mui/material';
import {
	isBiggerThanMediumMedia,
	isMobileMedia,
} from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledFormControlLabel = styled(FormControlLabel, {
	shouldForwardProp: (props) => props !== 'shouldBold',
})<{ shouldBold: boolean }>`
	.MuiFormControlLabel-label {
		font-weight: ${({ shouldBold }) => (shouldBold ? 500 : 'normal')};
		display: flex;
		font-size: 0.8rem;

		${isBiggerThanMediumMedia} {
			font-size: 1rem;
		}
	}

	${isMobileMedia} {
		margin-right: 0;

		& span {
			font-size: small;
			padding: ${spacing.xxs};
		}
	}

	.MuiFormControlLabel-label::first-letter {
		text-transform: uppercase;
	}
`;
