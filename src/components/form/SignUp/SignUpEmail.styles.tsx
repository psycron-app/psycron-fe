import { Box, styled } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledSignUpForm = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
`;

export const SignUpEmailBackButtonWrapper = styled(Box)`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

export const SignUpEmailBackButton = styled(Button)`
	padding: 0;
	height: 1rem;
	color: ${palette.tertiary.dark};

	& span {
		display: flex;
		align-items: center;
		margin: 0;
	}

	& :hover {
		color: ${palette.brand.purple};
	}
`;

export const SignUpEmailConcentCheckboxLabel = styled(Text)`
	display: block;
	font-size: 0.9rem;
	white-space: normal;
	overflow-wrap: anywhere;

	${isMobileMedia} {
		font-size: 0.75rem;
	}

	& span {
		font-size: inherit;
	}

	& a {
		display: inline;
		font-size: inherit;
	}
`;
