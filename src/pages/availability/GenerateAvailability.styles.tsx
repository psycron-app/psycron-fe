import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const GenerateAvailabilityContentWrapper = styled(Box)`
	flex: 1;
	overflow-y: auto;
	padding: ${spacing.mediumSmall} ${spacing.xs};
	display: flex;
	flex-direction: column;
	position: relative;
	padding-bottom: 0;

	${isBiggerThanMediumMedia} {
		overflow: hidden;
		align-items: center;
		justify-content: center;
	}
`;
