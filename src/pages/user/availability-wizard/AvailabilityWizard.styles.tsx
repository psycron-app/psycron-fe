import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';

export const StyledItemContentWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;

	${isBiggerThanMediumMedia} {
		width: 50%;
	}
`;

export const StyledAvailabilityHoursWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	position: relative;
`;
