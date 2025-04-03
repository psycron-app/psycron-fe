import { Box, CircularProgress, styled } from '@mui/material';

export const StyledBttnContentWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 100%;
`;

export const BttnLoader = styled(CircularProgress)`
	position: absolute;
	pointer-events: none;
	left: 40%;
`;
