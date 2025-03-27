import { Box, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const BookingHourWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding-bottom: ${spacing.small};

	${isBiggerThanMediumMedia} {
		padding-bottom: ${spacing.mediumSmall};
	}
`;

export const BookingHour = styled(Text)`
	font-size: 0.9rem;
	font-weight: 500;
	text-align: center;

	${isBiggerThanMediumMedia} {
		font-size: 1rem;
	}
`;

export const SwitchingBoxes = styled(Box)`
	padding: 0 ${spacing.small};
	padding-top: ${spacing.small};
	${isBiggerThanMediumMedia} {
		padding-top: ${spacing.mediumSmall};
	}
`;
