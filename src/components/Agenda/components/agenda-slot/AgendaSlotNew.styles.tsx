import { Box, css, styled } from '@mui/material';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { zIndexHover } from '@psycron/theme/zIndex';

import { getBackgroundColor, getBorderColor, getSVGColor } from './utils';

export const SlotWrapper = styled(Box, {
	shouldForwardProp: (props) =>
		props !== 'isHighlighted' && props !== 'isLastInRow',
})<{ isHighlighted?: boolean; isLastInRow: boolean }>`
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	background-color: ${palette.background.default};
	border-top: 4px solid
		${({ isHighlighted }) =>
			isHighlighted ? palette.info.light : palette.background.default};

	border-bottom: 4px solid
		${({ isHighlighted }) =>
			isHighlighted ? palette.info.light : palette.background.default};

	${({ isHighlighted, isLastInRow }) =>
		isHighlighted
			? css`
					z-index: ${zIndexHover};
					border-right: ${isLastInRow ? `2px solid ${palette.info.light}` : 'none'};
					border-top-right-radius: ${isLastInRow ? spacing.mediumSmall : '0'};
					border-bottom-right-radius: ${isLastInRow ? spacing.mediumSmall : '0'};
							transition: 'border-color 0.1s ease-out',
					willChange: 'border-color',
				`
			: css`
					border-right: ${isLastInRow
						? `2px solid ${palette.background.default}`
						: 'none'};
					border-top-right-radius: ${isLastInRow ? spacing.mediumSmall : '0'};
					border-bottom-right-radius: ${isLastInRow
						? spacing.mediumSmall
						: '0'};
				`}
`;
export const RowHighlight = styled(Box, {
	shouldForwardProp: (props) =>
		props !== 'isHighlighted' && props !== 'isLastInRow',
})<{ isHighlighted?: boolean; isLastInRow: boolean }>`
	width: 100%;
	position: absolute;
	height: 100%;

	${({ isHighlighted, isLastInRow }) =>
		isHighlighted
			? css`
					border-top-right-radius: ${isLastInRow ? spacing.mediumSmall : '0'};
					border-bottom-right-radius: ${isLastInRow
						? spacing.mediumSmall
						: '0'};
				`
			: css`
					border-top-right-radius: ${isLastInRow ? spacing.mediumSmall : '0'};
					border-bottom-right-radius: ${isLastInRow
						? spacing.mediumSmall
						: '0'};
				`}
`;

export const StyledSlotHoverable = styled(Tooltip, {
	shouldForwardProp: (props) =>
		props !== 'status' && props !== 'isHighlighted' && props !== 'isLastInRow',
})<{ isHighlighted?: boolean; isLastInRow: boolean; status: ISlotStatus }>`
	width: 100%;
	height: 100%;
	padding: 4px 8px;

	.MuiButtonBase-root {
		width: 100%;
		padding: 4px 8px;
		border-radius: 10px;
		background-color: ${({ status }) => getBackgroundColor(status)};

		box-shadow: ${({ isHighlighted, status }) =>
			isHighlighted && status !== 'EMPTY' && shadowMain};

		&:hover {
			border: 2px solid ${({ status }) => getBorderColor(status)};
			box-shadow: ${({ status }) => status !== 'EMPTY' && shadowMain};
			z-index: ${({ status }) => (status !== 'EMPTY' ? zIndexHover : 0)};

			svg {
				color: ${({ status }) => getSVGColor(status)};
			}
		}
	}
`;
