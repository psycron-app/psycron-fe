import { Box, css, styled } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const Slot = styled(Box, {
	shouldForwardProp: (props) => props !== 'isSimple',
})<{ isSimple: boolean }>`
	height: ${({ isSimple }) => (isSimple ? '2rem' : '5rem')};
	border: 1px solid ${palette.gray['02']};
	border-radius: 5px;
	padding: ${spacing.space};

	border-bottom: 0;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const AgendaTopRow = styled(Box, {
	shouldForwardProp: (props) => props !== 'isSimple',
})<{ isSimple: boolean }>`
	height: 3.75rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	position: sticky;
	top: ${({ isSimple }) => (isSimple ? '-0.5rem' : '-1.5rem')};

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
