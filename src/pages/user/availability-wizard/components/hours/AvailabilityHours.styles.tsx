import { Box, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';

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
	background-color: ${palette.background.paper};
`;
