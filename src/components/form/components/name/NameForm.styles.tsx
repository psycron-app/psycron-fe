import { Box, styled, TextField } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const NameFormWrapper = styled(Box)`
	display: flex;
	width: 100%;

	flex-direction: column;

	padding-bottom: 0;
	${isBiggerThanMediumMedia} {
		padding-bottom: ${spacing.xs};
	}
`;

export const StyledNameInput = styled(TextField)`
	padding-bottom: ${spacing.small};

	${isBiggerThanMediumMedia} {
		padding-bottom: ${spacing.medium};
	}
`;

export const LastNameInputWrapper = styled(Box)`
	width: 100%;
	padding-bottom: ${spacing.small};

	${isBiggerThanMediumMedia} {
		padding-bottom: ${spacing.medium};
	}
`;
