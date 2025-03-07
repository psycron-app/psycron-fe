import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { palette } from '@psycron/theme/palette/palette.theme';

export const getBackgroundColor = (status: ISlotStatus) => {
	switch (status) {
		case 'AVAILABLE':
			return palette.success.light;
		case 'BOOKED':
			return palette.error.light;
		case 'BLOCKED':
			return palette.gray['01'];
		default:
			return palette.background.default;
	}
};

export const getBorderColor = (status: ISlotStatus) => {
	switch (status) {
		case 'AVAILABLE':
			return palette.success.main;
		case 'BOOKED':
			return palette.error.main;
		default:
			return 'transparent';
	}
};

export const getSVGColor = (status: ISlotStatus) => {
	switch (status) {
		case 'AVAILABLE':
			return palette.success.dark;
		case 'BOOKED':
			return palette.error.main;
		default:
			return 'inherit';
	}
};
