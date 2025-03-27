import { Box, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const BookingAppointmentTitleWrapper = styled(Box)`
	padding: ${spacing.small};

	${isBiggerThanMediumMedia} {
		padding-bottom: ${spacing.mediumSmall};
	}
`;

export const BookingAppointmentTitle = styled(Text)`
	font-size: 1.2rem;
	font-weight: 600;

	${isBiggerThanMediumMedia} {
		font-size: 1.5rem;
		font-weight: 700;
	}
`;

export const StyledBookAppointmentPgWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledBookingAgendaWrapper = styled(Box)`
	padding: ${spacing.small};

	display: flex;
	flex-direction: column;

	width: 100%;
	background-color: ${palette.background.default};
	border-radius: ${spacing.mediumLarge};

	${isBiggerThanMediumMedia} {
		width: 90%;
		padding: ${spacing.medium};
	}
`;
