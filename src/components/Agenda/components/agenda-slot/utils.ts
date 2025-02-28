import { palette } from '@psycron/theme/palette/palette.theme';

import type { StyledAgendaStatusProps } from './AgendaSlot.types';

export const getBackgroundColor = (status: StyledAgendaStatusProps) => {
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
};

export const getBorderColor = (status: StyledAgendaStatusProps) => {
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
};

export const getSVGColor = (status: StyledAgendaStatusProps) => {
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
};
