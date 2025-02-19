import { Box, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';

import type { StyledAgendaStatusProps } from './AgendaSlot.types';

export const StyledGridSlots = styled(Grid, {
	shouldForwardProp: (props) =>
		props !== 'status' && props !== 'isBeforeToday' && props !== 'isTherapist',
})<{
	isBeforeToday: boolean;
	isTherapist: boolean;
	status: StyledAgendaStatusProps;
}>`
	height: 3.125rem;
	width: 3.125rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;

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
				case 'selected':
					return palette.info.main;
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
			case 'selected':
				return palette.info.light;
			case 'clicked':
				return palette.secondary.light;
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
