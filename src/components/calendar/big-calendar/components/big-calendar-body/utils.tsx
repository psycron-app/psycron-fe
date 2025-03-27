import { css } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';

import type { IBigCalendarView } from '../../BigCalendar.types';

export const getBackgroundStyles = (
	status?: string,
	mode?: IBigCalendarView
) => {
	if (status === 'BOOKED' && mode === 'book') {
		return css`
			background-color: ${palette.gray['01']};
			cursor: not-allowed;
		`;
	}

	if (status === 'BOOKED') {
		return css`
			background-color: ${palette.primary.main};
			cursor: pointer;
		`;
	}

	if (status === 'AVAILABLE') {
		return css`
			background-color: ${palette.success.light};
			cursor: pointer;
		`;
	}

	return css`
		background-color: ${palette.gray['01']};
	`;
};

export const getBorderStyles = (
	isToday: boolean,
	status?: string,
	mode?: IBigCalendarView
) => {
	if (isToday) {
		return css`
			border: 2px solid ${palette.secondary.main};
		`;
	}

	if (status === 'BOOKED' && mode === 'book') {
		return css`
			border: 1px solid ${palette.gray['01']};
		`;
	}

	if (status === 'BOOKED') {
		return css`
			border: 2px solid ${palette.primary.main};
			:hover {
				box-shadow: ${shadowMain};
			}
		`;
	}

	if (status === 'AVAILABLE') {
		return css`
			border: 1px solid ${palette.success.main};
		`;
	}

	return css`
		border: 1px solid ${palette.gray['01']};
	`;
};
