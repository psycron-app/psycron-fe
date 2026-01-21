import { checkboxClasses } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';

import type { Palette } from '../palette/palette.types';

const checkboxStyles = ({ palette }: Theme): Record<string, CSSObject> => {
	const { primary } = palette as unknown as Palette;

	return {
		'&.Mui-checked': {
			color: primary.action.press,
		},
		root: {
			color: primary.main,
			'&  div': {
				border: '1px solid red',
			},
			[`&.${checkboxClasses.checked}`]: {
				color: primary.action.press,
			},
			[`&.${checkboxClasses.disabled}`]: {
				color: primary.action.disabled,
			},
		},
	};
};

export default checkboxStyles;
