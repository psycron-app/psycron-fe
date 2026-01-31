import { Box, styled } from '@mui/material';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const SignInConsentWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	flex-direction: row;

	width: 100%;
	padding-top: ${spacing.small};
`;
