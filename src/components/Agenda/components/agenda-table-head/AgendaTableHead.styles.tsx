import { styled, TableCell } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { zIndexTableHead } from '@psycron/theme/zIndex';

export const StickyCell = styled(TableCell)`
	position: sticky;
	left: 0;
	z-index: ${zIndexTableHead};
	background-color: ${palette.background.default};

	width: 20px;
	height: 50px;
	top: 0;
`;
