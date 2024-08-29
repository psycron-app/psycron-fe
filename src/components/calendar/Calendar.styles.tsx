/* eslint-disable indent */
import { Box, css, Paper, styled } from '@mui/material';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import { Text } from '../text/Text';

export const StyledTitle = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;

	& svg {
		width: 1.25rem;
	}
`;

export const StyledCalendarWrapper = styled(Box)`
	width: 100%;
	padding: ${spacing.medium};

	${isBiggerThanTabletMedia} {
		width: 18.75rem;
	}
`;

export const StyledChevronWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
`;

export const StyledPaper = styled(Paper)`
	padding: ${spacing.small};
`;

export const StyledCalendarNumberWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'isCurrentMonth',
})<{ isCurrentMonth: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	& :hover {
		cursor: pointer;
		background-color: ${({ isCurrentMonth }) =>
			isCurrentMonth ? palette.primary.main : palette.primary.light};
		border-radius: 50%;
		height: 30px;
		width: 30px;
	}
`;

export const StyledCalendarNumber = styled(Text, {
	shouldForwardProp: (props) =>
		props !== 'isCurrentDay' && props !== 'isCurrentMonth',
})<{
	isCurrentDay: boolean;
	isCurrentMonth: boolean;
}>`
	display: flex;
	align-items: center;
	justify-content: center;

	${({ isCurrentDay }) =>
		isCurrentDay
			? css`
					background-color: ${palette.secondary.action.hover};
					border-radius: 50%;
					height: 30px;
					width: 30px;
				`
			: css`
					background-color: 'transparent';
				`};

	color: ${({ isCurrentMonth }) =>
		isCurrentMonth ? palette.text.primary : palette.text.disabled};
`;
