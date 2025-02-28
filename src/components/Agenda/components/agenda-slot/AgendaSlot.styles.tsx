import { Box, css, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { StyledAgendaStatusProps } from './AgendaSlot.types';

export const StyledGridSlots = styled(Grid, {
	shouldForwardProp: (props) =>
		props !== 'status' &&
		props !== 'isBeforeToday' &&
		props !== 'isTherapist' &&
		props !== 'isSelectedDay' &&
		props !== 'isFirstSlot' &&
		props !== 'isLastSlot',
})<{
	isBeforeToday: boolean;
	isFirstSlot: boolean;
	isLastSlot: boolean;
	isSelectedDay: boolean;
	isTherapist: boolean;
	status: StyledAgendaStatusProps;
}>`
	height: 3.125rem;
	width: 3.125rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${spacing.space};
	overflow: hidden;

	cursor: ${({ status, isBeforeToday }) =>
		status === 'booked' || status === 'unavailable' || isBeforeToday
			? 'not-allowed'
			: 'pointer'};

	border: 1px solid
		${({ status }) => {
			switch (status) {
				case 'available':
					return palette.success.main;
				case 'booked':
					return palette.error.main;
				case 'clicked':
					return palette.secondary.main;
				default:
					return 'transparent';
			}
		}};

	background-color: ${({ status }) => {
		switch (status) {
			case 'available':
				return palette.success.light;
			case 'booked':
				return palette.error.light;
			case 'clicked':
				return palette.secondary.light;
			case 'unavailable':
				return palette.gray['01'];
			default:
				return palette.background.default;
		}
	}};

	opacity: ${({ isBeforeToday }) => (isBeforeToday ? 0.5 : 1)};
	transition:
		opacity 0.3s ease-in-out,
		background-color 0.3s ease-in-out;

	box-shadow: ${({ status }) => (status === 'clicked' ? shadowPress : 'none')};

	& svg {
		color: ${({ status }) => {
			switch (status) {
				case 'available':
					return palette.success.dark;
				case 'booked':
					return palette.error.main;
				case 'selected':
					return palette.info.main;
				case 'clicked':
					return palette.secondary.main;

				default:
					return 'inherit';
			}
		}};
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

export const StyledSlotsWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: inherit;

	& > button {
		cursor: inherit;
	}
`;
