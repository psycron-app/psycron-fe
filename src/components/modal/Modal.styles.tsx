import { Box, Modal, styled } from '@mui/material';
import { isSmallerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledModal = styled(Modal)`
	padding: ${spacing.mediumLarge};
	z-index: 1000;
`;

export const StyledContentWrapper = styled(Box)`
	margin: 0;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	height: auto;

	${isSmallerThanTabletMedia} {
		width: 100%;
	}
`;
