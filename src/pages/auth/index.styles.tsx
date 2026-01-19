import { Box, styled } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const AuthPageWrapper = styled(Box)`
	height: calc(100vh - var(--total-component-height));
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${isMobileMedia} {
		padding: ${spacing.medium};
	}
`;
