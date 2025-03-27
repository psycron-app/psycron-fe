import { Paper, styled } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledPaperModal = styled(Paper)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	z-index: 500;

	padding: ${spacing.small};
	background-color: ${palette.background.default};

	${isMobileMedia} {
		width: 100%;
		padding: ${spacing.xs};
		border-radius: 0;
		height: 100%;
	}
`;
