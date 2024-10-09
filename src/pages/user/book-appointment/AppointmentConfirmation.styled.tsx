import { Box, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledTitle = styled(Text)`
	font-size: 1.9rem;
	font-weight: 700;
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
