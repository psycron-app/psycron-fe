import { css, Grid, styled } from '@mui/material';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const TabledHeadRowItem = styled(Grid, {
	shouldForwardProp: (props) => props !== 'isSmall',
})<{ isSmall?: boolean }>`
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;

	${({ isSmall }) =>
		!isSmall &&
		css`
			&:hover {
				cursor: pointer;
			}
			:null;
		`}
`;

export const StyledTableHeadGrid = styled(Grid)`
	flex-wrap: nowrap;

	padding: ${spacing.xs};
	${isBiggerThanTabletMedia} {
		padding-right: ${spacing.small};
	}
`;
