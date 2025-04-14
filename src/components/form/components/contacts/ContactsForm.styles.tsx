import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const EmailPhoneWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;

	${isBiggerThanMediumMedia} {
		flex-direction: row;
	}
`;

export const PhoneWrapper = styled(Box)`
	width: 100%;
	padding-right: 0;
	padding-bottom: ${spacing.xs};

	${isBiggerThanMediumMedia} {
		padding-right: ${spacing.small};
		padding-bottom: ${spacing.small};
	}
`;

export const EmailInputWrapper = styled(Box)`
	width: 100%;
	padding-left: 0;
	padding-bottom: ${spacing.xs};

	${isBiggerThanMediumMedia} {
		padding-left: ${spacing.small};
		padding-bottom: ${spacing.small};
	}
`;

export const WhatsappWrapper = styled(Box)`
	padding: ${spacing.xs} 0;

	${isBiggerThanMediumMedia} {
		padding: ${spacing.small} 0;
	}
`;
