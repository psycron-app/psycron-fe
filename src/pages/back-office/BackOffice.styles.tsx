import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const BackofficePageWrapper = styled(Box)`
	height: 100%;
	width: 100%;

	display: flex;
	flex-direction: column;

	gap: ${spacing.mediumLarge};
`;

export const BackOfficeHeader = styled(Box)`
	display: flex;
	align-items: flex-start;
`;

export const BackOfficeHeaderText = styled(Text)`
	font-size: 1.8rem;
	font-weight: 600;
`;

export const BackOfficeContent = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	gap: ${spacing.medium};
`;

export const BackOfficeItemRow = styled(Box)`
	display: flex;
`;

export const BackOfficeItem = styled(Box)`
	display: flex;
	flex-direction: column;

	box-shadow: ${shadowPress};
	padding: ${spacing.small};
	border-radius: ${spacing.medium};
	border: 1px solid ${palette.brand.purple};
	min-width: 50%;

	${isMobileMedia} {
		width: 100%;
	}
`;
