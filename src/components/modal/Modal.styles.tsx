import { Box, Modal, styled } from '@mui/material';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledModal = styled(Modal)`
	padding: ${spacing.mediumLarge};
	z-index: 999;
`;

export const StyledContentWrapper = styled(Box)`
	margin: 0;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	height: auto;
`;
