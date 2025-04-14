import { inputBaseClasses } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';
import type { Palette } from '@psycron/theme/palette/palette.types';

import { isMobileMedia } from '../media-queries/mediaQueries';
import { shadowInnerPress } from '../shadow/shadow.theme';
import { spacing } from '../spacing/spacing.theme';

const inputStyles = ({ palette }: Theme): Record<string, CSSObject> => {
	const { text, gray } = palette as unknown as Palette;

	return {
		root: {
			borderRadius: `calc(2 * ${spacing.mediumSmall})`,
			minHeight: '50px',
			boxShadow: shadowInnerPress,
			color: text.primary,
			'::before': {
				borderBottom: '0 !important',
			},
			'::after': {
				borderBottom: '0 !important',
			},
			[`&.${inputBaseClasses.disabled}`]: {
				backgroundColor: gray['02'],
			},

			[isMobileMedia]: {
				height: '40px',
			},
		},
	};
};

export default inputStyles;
