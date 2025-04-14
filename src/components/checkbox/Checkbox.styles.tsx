import { FormControlLabel, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';

export const StyledFormControlLabel = styled(FormControlLabel, {
	shouldForwardProp: (props) => props !== 'shouldBold',
})<{ shouldBold: boolean }>`
	font-size: 0.8rem;

	.MuiFormControlLabel-label {
		font-weight: ${({ shouldBold }) => (shouldBold ? 600 : 'normal')};
	}

	${isBiggerThanMediumMedia} {
		font-size: 1rem;
	}

	.MuiFormControlLabel-label::first-letter {
		text-transform: uppercase;
	}
`;
