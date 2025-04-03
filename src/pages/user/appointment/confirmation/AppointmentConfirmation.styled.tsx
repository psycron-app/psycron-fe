import { Box, Paper, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ConfirmationPageWrapper = styled(Box)`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: ${spacing.small};
`;

export const AppointmentsInfoWrapper = styled(Paper)`
	max-height: 33rem;
	padding: ${spacing.small};
	overflow-y: scroll;
`;

export const StyledTitle = styled(Text)`
	font-size: 1.9rem;
	font-weight: 700;

	display: flex;
	justify-content: center;
	flex-direction: column;

	${isBiggerThanTabletMedia} {
		flex-direction: row;
	}
`;

export const StyledSubTitle = styled(Text)`
	font-size: 1.5rem;
	font-weight: 600;
`;

export const StrongText = styled(Box)`
	font-weight: 800;
	color: ${palette.info.main};
	padding: 0 ${spacing.space};
`;

export const AppointmentItemWrapper = styled(Tooltip)`
	border: 1px solid ${palette.primary.main};
	border-radius: ${spacing.medium};
	margin-bottom: ${spacing.xs};

	:hover {
		box-shadow: ${shadowMain};
	}

	button {
		border-radius: ${spacing.mediumSmall};
		padding: ${spacing.small};
		width: 100%;
		height: 100%;

		:hover {
			background-color: ${palette.primary.main};
		}
	}
`;

export const AppointmentItem = styled(Box)`
	display: flex;
`;
