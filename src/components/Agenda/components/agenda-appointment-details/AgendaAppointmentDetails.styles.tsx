import { Box, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	position: relative;

	${isBiggerThanTabletMedia} {
		flex-direction: row;
	}
`;

export const StyledPatientDetails = styled(Box)`
	width: 100%;
	${isBiggerThanTabletMedia} {
		width: 60%;
	}
`;

export const StyledSessionDatesList = styled(Box)`
	position: relative;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 18.75rem;
	scroll-behavior: smooth;
	width: 100%;
	margin-top: ${spacing.mediumSmall};
	${isBiggerThanTabletMedia} {
		margin-top: 0;
		width: 40%;
	}
`;

export const StyledSessionDatesTitle = styled(Text)`
	position: sticky;
	background-color: ${palette.background.default};
	font-weight: 600;
	top: 0;
`;

export const StyledNextSessionText = styled(Text)`
	font-size: 0.9rem;

	color: ${palette.secondary.dark};

	&:hover {
		color: ${palette.secondary.main};
		cursor: pointer;
	}
`;
