import { Box, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';

import type { StyledAgendaStatusProps } from './Agenda.types';

export const StyledGridHours = styled(Grid)`
	width: 3.125rem;
	text-align: center;
`;

export const StyledHoursWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

// export const StyledGridSlots = styled(Grid, {
// 	shouldForwardProp: (props) =>
// 		props !== 'isAvailable' &&
// 		props !== 'isBooked' &&
// 		props !== 'isSelected' &&
// 		props !== 'isClicked',
// })<{
// 	isAvailable: boolean;
// 	isBooked: boolean;
// 	isClicked: boolean;
// 	isSelected: boolean;
// }>`
// 	height: 3.125rem;
// 	width: 3.125rem;
// 	text-align: center;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;

// 	border-radius: 4px;

// 	background-color: ${palette.background.default};

// 	${({ isAvailable }) =>
// 		isAvailable
// 			? css`
// 					border: 1px solid ${palette.success.main};
// 					background-color: ${palette.success.light};

// 					cursor: pointer;

// 					& svg {
// 						color: ${palette.success.dark};
// 					}
// 				`
// 			: css`
// 					border: 1px solid ${palette.gray['02']};
// 					cursor: not-allowed;
// 				`}

// 	${({ isBooked }) =>
// 		isBooked &&
// 		css`
// 			border: 1px solid ${palette.error.main};
// 			background-color: ${palette.error.light};

// 			& svg {
// 				color: ${palette.error.main};
// 			}
// 			cursor: not-allowed;
// 		`}

// 	${({ isSelected }) =>
// 		isSelected &&
// 		css`
// 			border: 1px solid ${palette.info.main};
// 			background-color: ${palette.info.light};

// 			& svg {
// 				color: ${palette.info.main};
// 			}
// 		`}

// 			${({ isClicked }) =>
// 		isClicked &&
// 		css`
// 			border: 1px solid ${palette.secondary.main};
// 			background-color: rgb(197 167 255 / 75%);
// 			box-shadow: ${shadowPress};

// 			& svg {
// 				color: ${palette.secondary.main};
// 			}
// 		`}
// `;

export const StyledGridSlots = styled(Grid, {
	shouldForwardProp: (prop) => prop !== 'status',
})<{
	status: StyledAgendaStatusProps;
}>`
	height: 3.125rem;
	width: 3.125rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: ${palette.background.default};
	cursor: ${({ status }) =>
		status === 'booked' || status === 'beforeToday'
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
					return palette.gray['02'];
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
			case 'beforeToday':
				return palette.gray['04'];
			default:
				return palette.background.default;
		}
	}};

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
`;
