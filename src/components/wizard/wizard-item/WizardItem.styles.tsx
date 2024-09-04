import { styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';

export const WizardItemTitle = styled(Text)`
	font-size: 1.5rem;

	${isBiggerThanMediumMedia} {
		font-size: 2.125rem;
	}
`;
