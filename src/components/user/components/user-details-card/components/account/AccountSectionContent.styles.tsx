import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { PillTone } from './AccountSectionContent.types';

export const AccountRowsContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	width: 100%;
`;

export const UserDetailsValueText = styled(Text)`
	font-weight: 600;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	${isMobileMedia} {
		white-space: normal;
	}
`;

export const UserDetailsPill = styled(Box, {
	shouldForwardProp: (props) => props !== 'tone',
})<{ tone: PillTone }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: ${spacing.xxs} ${spacing.xs};
	border-radius: ${spacing.small};

	border: 1px solid
		${({ tone }) => (tone === 'info' ? palette.info.main : palette.gray['02'])};

	background-color: ${({ tone }) =>
		tone === 'info' ? palette.info.light : palette.gray['02']};

	color: ${({ tone }) =>
		tone === 'info' ? palette.info.main : palette.gray['07']};
`;
