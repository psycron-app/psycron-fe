import { Box, css, Grid, Skeleton, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { SlotVisualType } from './BigCalendarBody.types';
import { getSlotStyles } from './utils';

export const BigCalendarBodyWrapper = styled(Box)`
	height: 30rem;
	overflow-y: auto;

	${isBiggerThanTabletMedia} {
		height: 43.75rem;
	}
`;

export const BigCalendarBodyGrid = styled(Grid, {
	shouldForwardProp: (props) => props !== 'includeHourColumn',
})<{ includeHourColumn: boolean }>`
	display: grid;
	grid-template-columns: ${({ includeHourColumn }) =>
		includeHourColumn
			? css`
					80px repeat(7, 1fr)
					`
			: css`
					repeat(7, 1fr)
					`};
	margin-bottom: ${spacing.xxs};

	${isBiggerThanTabletMedia} {
		margin-bottom: ${spacing.xxs};
	}
`;

export const BigCalendarHour = styled(Text)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${spacing.xs};
`;

export const BigCalendarSlot = styled(Grid, {
	shouldForwardProp: (props) => props !== 'isToday' && props !== 'slotType',
})<{ isToday: boolean; slotType?: SlotVisualType }>`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80px;
	overflow: hidden;
	padding: ${spacing.xxs};
	border-radius: ${spacing.xs};

	${({ slotType, isToday }) => getSlotStyles(slotType, isToday)}
`;

export const StyledTableSkeleton = styled(Skeleton)`
	width: 100%;
	height: 100%;
	transform: none;
	background-color: ${palette.info.light};
	border-radius: ${spacing.xs};
`;
