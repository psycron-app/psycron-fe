import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const InputWrapper = styled(Box)`
	padding-bottom: ${spacing.xs};

	${isBiggerThanMediumMedia} {
		padding-bottom: ${spacing.mediumSmall};
	}
`;
