import { Box, styled } from '@mui/material';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';

export const Grid = styled(Box)`
	width: 100%;
	display: grid;

	position: relative;

	grid-template-columns: 2.5rem repeat(7, 1fr);

	${isBiggerThanTabletMedia} {
		grid-template-columns: 5rem repeat(7, 1fr);
	}
`;
