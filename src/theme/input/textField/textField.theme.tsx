import type { CSSObject } from '@mui/system';

const textFieldStyles = (): Record<string, CSSObject> => {
	return {
		root: {
			height: '50px',
			'& label': {
				transition: 'all 0.2s ease-out',
			},
			'& label.MuiInputLabel-shrink': {
				left: '-0.8rem',
			},
		},
	};
};

export default textFieldStyles;
