import { FormControlLabel, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';

export const StyledFormControlLabel = styled(FormControlLabel)`
	.MuiFormControlLabel-label {
		font-size: 0.9rem;

		${isBiggerThanMediumMedia} {
			font-size: 1rem;
		}
		& ::first-letter {
			text-transform: uppercase;
		}
	}
`;
