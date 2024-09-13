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
