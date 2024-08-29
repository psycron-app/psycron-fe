import { Box, css, styled } from '@mui/material';
import {
	isBiggerThanTabletMedia,
	isMobileMedia,
} from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const Grid = styled(Box)`
	width: 100%;
	display: grid;

	grid-template-columns: 2.5rem repeat(7, 1fr);

	${isBiggerThanTabletMedia} {
		grid-template-columns: 5rem repeat(7, 1fr);
	}
`;

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

export const TimeSlot = styled(Box)`
	height: 5rem;
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

export const Slot = styled(Box)`
	height: 5rem;
	border: 1px solid ${palette.gray['02']};
	border-radius: 5px;
	padding: ${spacing.space};

	border-bottom: 0;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const AgendaTopRow = styled(Box)`
	height: 3.75rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	position: sticky;
	top: -1.5rem;
	background-color: ${palette.background.default};
	z-index: 10;

	${isMobileMedia} {
		top: -0.5rem;

		& p {
			font-size: 0.7rem;
		}
	}
`;

export const AgendaTopRowItem = styled(Box, {
	shouldForwardProp: (props) => props !== 'isCurrentDay',
})<{ isCurrentDay: boolean }>`
	display: flex;
	flex-direction: column;

	${({ isCurrentDay }) =>
		isCurrentDay
			? css`
					background-color: ${palette.primary.light};
					color: ${palette.secondary.main};
					border: 1px solid ${palette.secondary.main};
					border-top: 0;
					border-bottom: 0;

					& p {
						font-weight: 700;
					}
				`
			: css`
					background-color: inherit;
					color: inherit;
				`}
`;
