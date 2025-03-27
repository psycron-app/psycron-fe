import { css, Grid, styled } from '@mui/material';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const BigCalendarHeaderWrapper = styled(Grid, {
	shouldForwardProp: (props) => props !== 'includeHourColumn',
})<{ includeHourColumn: boolean }>`
	position: sticky;
	display: grid;
	grid-template-columns: ${({ includeHourColumn }) =>
		includeHourColumn
			? css`
					80px repeat(7, 1fr)
					`
			: css`
					repeat(7, 1fr)
					`};

	margin-bottom: ${spacing.xs};

	${isBiggerThanTabletMedia} {
		margin-bottom: ${spacing.small};
	}
`;

export const BigCalendarDate = styled(Grid, {
	shouldForwardProp: (props) => props !== 'isToday',
})<{ isToday?: boolean }>`
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: center;

	${({ isToday }) =>
		isToday &&
		css`
			border-radius: ${spacing.xs};
			border: 2px solid ${palette.secondary.main};
			background-color: ${palette.secondary.light};
		`}

	${isBiggerThanTabletMedia} {
		flex-direction: column;
		align-items: center;
	}
`;
