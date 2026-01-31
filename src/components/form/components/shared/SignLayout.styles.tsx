import { Box, css, styled, TextField } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const SignUpWrapper = styled(Box)`
	padding: ${spacing.medium} ${spacing.mediumSmall};
	gap: ${spacing.mediumSmall};
	height: auto;
	min-width: 21.875rem;
	max-width: 34.375rem;
	border-radius: calc(2 * ${spacing.mediumSmall});
	box-shadow: ${shadowPress};
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-color: ${palette.background.default};

	${isMobileMedia} {
		width: 100%;
		padding: ${spacing.small} ${spacing.small};
	}
`;

export const LogoWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;

	svg {
		width: 4rem;
		height: auto;
	}
`;

export const SignLayoutFooterLink = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SignTitle = styled(Text)`
	font-weight: 700;
	font-size: 2rem;
	width: 80%;
`;

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
