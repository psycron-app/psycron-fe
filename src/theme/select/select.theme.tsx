import { selectClasses } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';
import type { Palette } from '@psycron/theme/palette/palette.types';

import { isMobileMedia } from '../media-queries/mediaQueries';
import { shadowDisabled } from '../shadow/shadow.theme';
import { spacing } from '../spacing/spacing.theme';

const selectStyles = ({ palette }: Theme): Record<string, CSSObject> => {
	const { secondary, primary } = palette as unknown as Palette;
	return {
		root: {
			'.MuiSvgIcon-root': {
				color: secondary.action.press,
				filter: shadowDisabled,
			},
			[isMobileMedia]: {
				marginBottom: spacing.space,
			},
		},
		icon: {
			color: primary.main,
			filter: shadowDisabled,
			[`&.${selectClasses.iconOpen}`]: {
				color: secondary.action.press,
				filter: shadowDisabled,
			},
			marginRight: spacing.xs,
		},
	};
};

export default selectStyles;
