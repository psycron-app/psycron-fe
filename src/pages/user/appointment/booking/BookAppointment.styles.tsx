import { Box, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledBookAppointmentPgWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledBookingAgendaWrapper = styled(Box)`
	padding: ${spacing.largeXl};

	display: flex;
	flex-direction: column;

	width: 100%;
	background-color: ${palette.background.default};
	border-radius: ${spacing.mediumLarge};

	${isBiggerThanMediumMedia} {
		width: 70%;
	}
`;
