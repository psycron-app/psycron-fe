import { Box, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';

export const HourSlotWrapper = styled(Box)`
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: '1px solid #ccc';
	background: ${palette.background.default};
`;
