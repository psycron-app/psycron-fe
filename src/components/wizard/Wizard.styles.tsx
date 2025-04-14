import { Box, LinearProgress, styled } from '@mui/material';
import { isSmallerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { motion } from 'framer-motion';

export const WizardWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	z-index: 10;
`;

export const WizardContentWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	flex: 1;

	position: relative;
	overflow-y: hidden;
	padding-top: 0;

	${isSmallerThanMediumMedia} {
		padding-top: ${spacing.small};
	}
`;

export const WizardStepper = styled(LinearProgress)`
	width: 100%;
	margin: 0;
`;

export const AnimationWrapper = styled(Box)`
	width: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	flex: 1;
	justify-content: center;
	align-items: center;

	overflow-y: hidden;
`;

export const WizardMotion = styled(motion.div)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
	overflow-y: auto;
`;

export const WizardActionWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
	padding: ${spacing.small};
`;
