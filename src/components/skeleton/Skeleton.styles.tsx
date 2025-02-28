import { Box, Skeleton, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledSkeletonWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'hasOnClick',
})<{ hasOnClick: boolean }>`
	border: 2px ${palette.gray['02']} dashed;
	width: fit-content;
	position: relative;

	border-radius: ${spacing.mediumLarge};
	padding: 0 ${spacing.mediumLarge};
	height: fit-content;

	animation: skeletonPulse 2s ease-in-out infinite;

	@keyframes skeletonPulse {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
		100% {
			opacity: 1;
		}
	}

	cursor: ${({ hasOnClick }) => (hasOnClick ? 'pointer' : 'default')};

	:hover {
		box-shadow: ${shadowMain};
		color: ${palette.primary.action.hover};
	}
`;

export const TextWrapper = styled(Box)`
	position: absolute;
	top: 50%;
	right: 0;
	width: 100%;
	z-index: 100;

	display: flex;
	justify-content: center;
`;

export const StyledSkeleton = styled(Skeleton)`
	border-radius: ${spacing.mediumLarge};
	background-color: ${palette.gray['02']};
`;
