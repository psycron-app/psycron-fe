import { Box, css, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { StyledGridSlotsProps } from './AgendaSlot.types';
import { getBackgroundColor, getBorderColor, getSVGColor } from './utils';

const shouldForwardProp = (prop: string) =>
	![
		'isBeforeToday',
		'isFirstSlot',
		'isLastSlot',
		'isSelectedDay',
		'isTherapist',
		'slotStatus',
	].includes(prop);

export const StyledGridSlots = styled(Grid, {
	shouldForwardProp,
})<StyledGridSlotsProps>`
	height: 3.125rem;
	width: 3.125rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${spacing.space};
	overflow: hidden;

	cursor: ${({ status, isBeforeToday, isTherapist }) =>
		!isTherapist &&
		(status === 'booked' || status === 'unavailable' || isBeforeToday)
			? 'not-allowed'
			: 'pointer'};

	border: 1px solid ${({ status }) => getBorderColor(status)};
	background-color: ${({ status }) => getBackgroundColor(status)};

	opacity: ${({ isBeforeToday }) => (isBeforeToday ? 0.5 : 1)};

	transition:
		opacity 0.3s ease-in-out,
		background-color 0.3s ease-in-out;

	box-shadow: ${({ status }) => (status === 'clicked' ? shadowPress : 'none')};

	& svg {
		color: ${({ status }) => getSVGColor(status)};
	}

	${({ isSelectedDay, isFirstSlot, isLastSlot }) =>
		isSelectedDay &&
		css`
			border-left: 4px solid ${palette.info.main};
			border-right: 4px solid ${palette.info.main};
			border-radius: 0;

			${isFirstSlot &&
			css`
				border-top: 4px solid ${palette.info.main};
				border-top-left-radius: ${spacing.small};
				border-top-right-radius: ${spacing.small};
			`}

			${isLastSlot &&
			css`
				border-bottom: 4px solid ${palette.info.main};
				border-bottom-left-radius: ${spacing.small};
				border-bottom-right-radius: ${spacing.small};
			`}
		`}
`;

export const StyledSlotsWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'disableInteractivity',
})<{ disableInteractivity: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;

	:hover {
		cursor: ${({ disableInteractivity }) =>
			disableInteractivity ? 'not-allowed' : 'inherit'};
	}

	& > * {
		:hover {
			cursor: ${({ disableInteractivity }) =>
				disableInteractivity ? 'not-allowed' : 'inherit'};
		}
	}
`;
