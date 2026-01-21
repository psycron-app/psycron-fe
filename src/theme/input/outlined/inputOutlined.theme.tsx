import { outlinedInputClasses } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';
import type { Palette } from '@psycron/theme/palette/palette.types';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

const inputOutlinedStyles = ({ palette }: Theme): Record<string, CSSObject> => {
	const { text, gray } = palette as unknown as Palette;

	return {
		root: {
			borderRadius: `calc(2 * ${spacing.mediumSmall})`,
			color: text.primary,
			height: '50px',
			[`&.${outlinedInputClasses.disabled}`]: {
				backgroundColor: gray['02'],
			},
		},
	};
};

export default inputOutlinedStyles;
