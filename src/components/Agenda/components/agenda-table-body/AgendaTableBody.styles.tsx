import { styled, TableBody, TableCell, TableRow } from '@mui/material';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { zIndexHover, zIndexTableHead } from '@psycron/theme/zIndex';

import type { IAgendaTableBodyStyledProps } from './AgendaTableBody.type';
import { getBackgroundColor, getBorderColor, getSVGColor } from './utils';

export const AgendaTableBodyWrapper = styled(TableBody, {
	shouldForwardProp: (props) => props !== 'isLoading',
})<{ isLoading: boolean }>`
	background-color: transparent;
`;

export const AgendaBodyRow = styled(TableRow)`
	:hover {
		background-color: ${palette.info.light} !important;
	}
`;

export const AgendaCellBody = styled(TableCell, {
	shouldForwardProp: (props) => props !== 'isLoading',
})<{ isLoading: boolean }>`
	padding: ${spacing.space} ${spacing.xs};
	height: 50px;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: ${({ isLoading }) =>
		isLoading ? `${palette.info.light} !important` : 'inherit'};

	&:hover {
		background-color: inherit !important;
	}
`;

export const StickyCell = styled(AgendaCellBody)`
	position: sticky;
	left: 0;
	z-index: ${zIndexTableHead};
	background-color: ${palette.background.default};

	&:hover {
		background-color: inherit !important;
	}

	${isBiggerThanTabletMedia} {
		background-color: inherit;
		z-index: 0;
	}
`;

export const StyledSlotHoverable = styled(Tooltip, {
	shouldForwardProp: (prop) =>
		!['status', 'isHighlightedColumn', 'isLoading'].includes(prop as string),
})<IAgendaTableBodyStyledProps>`
	width: 100%;
	height: 100%;
	padding: ${spacing.space} ${spacing.xs};

	.MuiButtonBase-root {
		width: 100%;
		padding: ${spacing.space} ${spacing.xs};
		border-radius: ${spacing.extraSmall};
		background-color: ${({ status }) =>
			status ? getBackgroundColor(status) : 'transparent'} !important;
		border: 2px solid transparent;

		&:hover {
			border: 2px solid ${({ status }) => getBorderColor(status)};
			box-shadow: ${({ status }) => status && shadowMain};
			background-color: ${({ status }) =>
				status ? `${getBackgroundColor(status)} !important ` : 'inherit'};
			z-index: ${({ status }) =>
				status !== ('EMPTY' || 'NOT AVAILABLE') ? zIndexHover : 0};

			svg {
				color: ${({ status }) => getSVGColor(status)};
			}
		}
	}
`;
