import { Box, css, Grid, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const WeekDaysHeaderGrid = styled(Grid)`
	margin-top: 0;
	margin-left: 0;
	position: sticky;
	top: 0;
	flex-wrap: nowrap;
`;

export const WeekDayWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;

export const THWeekDays = styled(Grid, {
	shouldForwardProp: (props) => props !== 'isHighlightedColumn',
})<{ isHighlightedColumn?: boolean }>`
	background-color: ${palette.background.default};
	padding: ${spacing.xs} ${spacing.small};
	border-top: 0;

	width: 100%;

	text-align: center;

	${({ isHighlightedColumn }) =>
		isHighlightedColumn &&
		css`
			border-radius: 0;
			border-left: 4px solid ${palette.secondary.main};
			border-right: 4px solid ${palette.secondary.main};
			border-top-left-radius: ${spacing.mediumSmall};
			border-top-right-radius: ${spacing.mediumSmall};
			border-top: 4px solid ${palette.secondary.main};
		`}
`;

export const StyledDayName = styled(Text)`
	text-transform: uppercase;
	font-weight: 700;
`;

export const MonthSubTitle = styled(Box)`
	padding: ${spacing.space};
	border: 2px solid ${palette.primary.main};
	border-radius: ${spacing.mediumSmall};
`;
