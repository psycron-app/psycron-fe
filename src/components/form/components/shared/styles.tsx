import { Box, css, styled, TextField } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const InputFields = styled(TextField, {
	shouldForwardProp: (props) => props !== 'maxWidth',
})<{ maxWidth?: string }>`
	box-sizing: border-box;

	${({ maxWidth }) =>
		maxWidth &&
		css`
			max-width: ${maxWidth};
		`}
`;

export const SignUpWrapper = styled(Box)`
	padding: ${spacing.medium} ${spacing.mediumSmall};
	gap: ${spacing.mediumSmall};
	height: auto;
	border-radius: calc(2 * ${spacing.mediumSmall});
	box-shadow: ${shadowPress};
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: ${palette.background.default};

	${isMobileMedia} {
		width: 100%;
	}
`;

export const LogoWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	padding-bottom: ${spacing.medium};

	svg {
		width: 3.25rem;
		height: auto;
	}
`;
