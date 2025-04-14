import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const NameFormWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;

	${isBiggerThanMediumMedia} {
		flex-direction: row;
	}
`;

export const FirstNameInputWrapper = styled(Box)`
	width: 100%;
	padding-bottom: ${spacing.xs};

	${isBiggerThanMediumMedia} {
		padding-right: ${spacing.small};
		padding-bottom: ${spacing.small};
	}
`;

export const LastNameInputWrapper = styled(Box)`
	width: 100%;
	padding-bottom: ${spacing.xs};

	${isBiggerThanMediumMedia} {
		padding-left: ${spacing.small};
		padding-bottom: ${spacing.small};
	}
`;
