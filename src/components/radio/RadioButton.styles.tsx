import { FormControlLabel, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';

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

	.MuiFormControlLabel-asterisk {
		color: ${palette.error.main};
		font-size: 0.75rem;
	}
`;
