import { Paper, styled } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledPaperModal = styled(Paper)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	max-height: 80%;

	padding: ${spacing.small};

	${isMobileMedia} {
		width: 100%;
	}
`;
