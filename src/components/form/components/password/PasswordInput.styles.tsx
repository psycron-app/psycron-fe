import { Box, IconButton, styled } from '@mui/material';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const PasswordWrapper = styled(Box)`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: ${spacing.small};

	${isBiggerThanTabletMedia} {
		flex-direction: row;
	}
`;

export const StyledIconButton = styled(IconButton)`
	width: 2em;
	height: 2em;
`;
