import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const UserDetailsRowContainer = styled(Box)`
	display: flex;
	gap: ${spacing.small};
	justify-content: space-between;
	align-items: center;

	${isMobileMedia} {
		gap: ${spacing.xs};
	}
`;

export const UserDetailsRowLabel = styled(Text)`
	color: ${palette.text.secondary};
`;

export const UserDetailsRowValue = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	min-width: 0;
	gap: ${spacing.xs};

	${isMobileMedia} {
		flex-wrap: wrap;
		justify-content: flex-end;
	}
`;

export const UserDetailsRowRight = styled(Box)`
	display: flex;
	justify-content: flex-end;
`;
