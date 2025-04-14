import { styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';

export const StyledBookedSlotText = styled(Text)`
	font-weight: 600;
	font-size: 0.5rem;

	${isBiggerThanTabletMedia} {
		font-weight: 500;
		font-size: 0.75rem;
	}
`;
