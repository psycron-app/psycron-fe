import { Box, styled } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const TimeSlotWrapper = styled(Box)`
	position: sticky;
	left: 0;
	top: 2.125rem;
	background-color: ${palette.background.default};
	z-index: 10;

	${isMobileMedia} {
		top: 3rem;
	}
`;

export const TimeSlot = styled(Box, {
	shouldForwardProp: (props) => props !== 'isSimple',
})<{ isSimple: boolean }>`
	height: ${({ isSimple }) => (isSimple ? '2rem' : '5rem')};
	border-top: 1px dashed ${palette.gray['02']};
	padding: ${spacing.space};

	display: flex;
	align-items: center;
	justify-content: center;

	${isMobileMedia} {
		& p {
			font-size: 0.7rem;
		}
	}
`;
