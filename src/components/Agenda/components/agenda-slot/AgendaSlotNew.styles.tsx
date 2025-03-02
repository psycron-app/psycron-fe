import { Box, css, styled } from '@mui/material';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { zIndexHover } from '@psycron/theme/zIndex';

import type { IAgendaSlotStyledProps } from './AgendaSlotNew.types';
import { getBackgroundColor, getBorderColor, getSVGColor } from './utils';

export const SlotWrapper = styled(Box, {
	shouldForwardProp: (prop) =>
		![
			'isHighlightedRow',
			'isLastInRow',
			'isLastInColumn',
			'isHighlightedColumn',
		].includes(prop as string),
})<IAgendaSlotStyledProps>`
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	background-color: ${palette.background.default};
	transition: border 0.1s ease-out;

	${({ isHighlightedRow, isLastInRow }) =>
		isHighlightedRow
			? css`
					z-index: ${zIndexHover};
					border-right: ${isLastInRow
						? `2px solid ${palette.info.main}`
						: 'none'};
					border-top-right-radius: ${isLastInRow ? spacing.mediumSmall : '0'};
					border-bottom-right-radius: ${isLastInRow
						? spacing.mediumSmall
						: '0'};
					border-top: 4px solid ${palette.info.main};
					border-bottom: 4px solid ${palette.info.main};
				`
			: ''}

	${({ isHighlightedColumn, isLastInColumn }) =>
		isHighlightedColumn
			? css`
					border-radius: 0;
					border-left: 4px solid ${palette.secondary.main};
					border-right: 4px solid ${palette.secondary.main};
					border-bottom-right-radius: ${isLastInColumn
						? spacing.mediumSmall
						: '0'};
					border-bottom-left-radius: ${isLastInColumn
						? spacing.mediumSmall
						: '0'};
					border-bottom: ${isLastInColumn
						? `4px solid ${palette.secondary.main}`
						: 'none'};
					border-top: none;
				`
			: ''}
`;

export const StyledSlotHoverable = styled(Tooltip, {
	shouldForwardProp: (prop) =>
		![
			'status',
			'isHighlightedRow',
			'isLastInRow',
			'isLastInColumn',
			'isHighlightedColumn',
		].includes(prop as string),
})<IAgendaSlotStyledProps>`
	width: 100%;
	height: 100%;
	padding: 4px 8px;

	.MuiButtonBase-root {
		width: 100%;
		padding: 4px 8px;
		border-radius: 10px;
		background-color: ${({ status }) => getBackgroundColor(status)};

		box-shadow: ${({ isHighlightedRow, isHighlightedColumn, status }) =>
			(isHighlightedRow || isHighlightedColumn) &&
			status !== 'EMPTY' &&
			shadowMain};

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
