import { css } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';

import type { IBigCalendarView } from '../../BigCalendar.types';

import type { SlotVisualType } from './BigCalendarBody.types';

export const getSlotVisualType = (
	status?: string,
	mode?: IBigCalendarView,
	isPast?: boolean,
	isToday?: boolean
): SlotVisualType => {
	if (
		(mode === 'book' || 'edit') &&
		(isPast || (isToday && status === 'EMPTY'))
	) {
		return 'DISABLED';
	}
	if (status === 'BOOKED') return 'BOOKED';
	if (status === 'AVAILABLE') return 'AVAILABLE';
	return 'DISABLED';
};

export const getSlotStyles = (type: SlotVisualType, isToday: boolean) => {
	return css`
		${getBackground(type)}
		${getBorder(type, isToday)}
	`;
};

const getBackground = (type: SlotVisualType) => {
	switch (type) {
		case 'BOOKED':
			return css`
				background-color: ${palette.primary.main};
				cursor: pointer;
			`;
		case 'AVAILABLE':
			return css`
				background-color: ${palette.success.light};
				cursor: pointer;
			`;
		case 'DISABLED':
		default:
			return css`
				background-color: ${palette.gray['01']};
				cursor: not-allowed;
			`;
	}
};

const getBorder = (type: SlotVisualType, isToday: boolean) => {
	if (isToday) {
		return css`
			border: 2px solid ${palette.secondary.main};
		`;
	}

	switch (type) {
		case 'BOOKED':
			return css`
				border: 2px solid ${palette.primary.main};
				:hover {
					box-shadow: ${shadowMain};
				}
			`;
		case 'AVAILABLE':
			return css`
				border: 1px solid ${palette.success.main};
			`;
		case 'DISABLED':
		default:
			return css`
				border: 1px solid ${palette.gray['01']};
			`;
	}
};
