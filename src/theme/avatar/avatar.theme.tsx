import { type CSSObject } from '@mui/system';

import { palette } from '../palette/palette.theme';
import { shadowSmallPurple } from '../shadow/shadow.theme';

const avatarStyles = (): Record<string, CSSObject> => {
	return {
		root: {
			boxShadow: shadowSmallPurple,
			border: `3px solid ${palette.tertiary.light}`,
		},
		img: {
			objectFit: 'contain',
		},
	};
};

export default avatarStyles;
