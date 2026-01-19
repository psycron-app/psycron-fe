import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const NameFormWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: ${spacing.small};

	${isBiggerThanMediumMedia} {
		flex-direction: row;
	}
`;

export const NameInputWrapper = styled(Box)`
	width: 100%;
`;
