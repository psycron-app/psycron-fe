import { Box, styled } from '@mui/material';
import {
	isBiggerThanMediumMedia,
	isMobileMedia,
} from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ContactsFormWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: ${spacing.mediumSmall};
`;

export const EmailPhoneWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	width: 100%;

	${isBiggerThanMediumMedia} {
		flex-direction: row;
	}
`;

export const InputWrapper = styled(Box)`
	width: 100%;
`;

export const ContactsFormSwitchWrapper = styled(Box)`
	display: flex;
	padding-left: ${spacing.small};
`;

export const ContactsFormWhatsAppWrapper = styled(Box)`
	width: 50%;

	${isMobileMedia} {
		width: 100%;
	}
`;
