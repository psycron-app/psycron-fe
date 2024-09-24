import { Box, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const WeekDaysHeaderGrid = styled(Grid)`
	margin-top: 0;
	margin-left: 0;
	height: 3.125rem;
	position: sticky;
	top: 0;
`;

export const THEmpty = styled(Grid)`
	padding: ${spacing.xs} ${spacing.small};
	border-top-left-radius: 1rem;

	width: auto;
	background-color: ${palette.background.default};
`;

export const WeekDayWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const THWeekDays = styled(Grid)`
	background-color: ${palette.background.default};
	padding: ${spacing.xs} ${spacing.small};
	border-top: 0;

	text-align: center;

	&:last-child {
		border-top-right-radius: 1rem;
	}
`;
