import { Box, Grid, styled } from '@mui/material';

export const StyledIAvailabilityHoursBoxWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 1rem;
`;

export const StyledIAvailabilityGrid = styled(Grid)`
	width: 100%;
	overflow-y: auto;
	overflow-x: auto;
	border-radius: 1rem;

	border-left: 0;

	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;

	&::-webkit-scrollbar {
		display: none;
	}
`;
