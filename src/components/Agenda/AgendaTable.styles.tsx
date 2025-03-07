import { styled, TableCell } from '@mui/material';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { zIndexHover } from '@psycron/theme/zIndex';

import { Tooltip } from '../tooltip/Tooltip';

import type { IAgendaSlotStyledProps } from './components/agenda-slot/AgendaSlotNew.types';
import {
	getBackgroundColor,
	getBorderColor,
	getSVGColor,
} from './components/agenda-slot/utils';

export const AgendaCellBody = styled(TableCell)`
	padding: ${spacing.space} ${spacing.small};
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
	padding: ${spacing.space} ${spacing.small};

	.MuiButtonBase-root {
		width: 100%;
		padding: ${spacing.space} ${spacing.small};
		border-radius: ${spacing.extraSmall};
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
