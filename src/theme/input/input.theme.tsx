import { inputBaseClasses, inputLabelClasses } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';
import type { Palette } from '@psycron/theme/palette/palette.types';

import { spacing } from '../spacing/spacing.theme';

const inputStyles = ({ palette }: Theme): Record<string, CSSObject> => {
	const { text, tertiary, brand, error } = palette as unknown as Palette;

	return {
		root: {
			borderRadius: `calc(2 * ${spacing.mediumSmall})`,
			color: text.primary,
			height: '3.125rem',
			[`&.${inputLabelClasses.focused}`]: { color: brand.purple },
			[`&.${inputLabelClasses.error}`]: { color: error.main },
			[`&.${inputBaseClasses.disabled}`]: {
				backgroundColor: tertiary.action.disabled,
			},
		},
	};
};

export default inputStyles;
