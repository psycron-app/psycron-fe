import { Box, styled } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const PageLayoutWrapper = styled(Box)`
	height: 100%;
	display: flex;
	flex-direction: column;
`;

export const PageTitleWrapper = styled(Box)`
	padding-bottom: ${spacing.largeXl};
`;

export const PageTitle = styled(Text)`
	font-size: 1.4rem;
	font-weight: 600;
	text-align: left;
`;

export const PageLoaderWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	height: 100%;
`;

export const PageChildrenWrapper = styled(Box)`
	height: 100%;

	flex-grow: 1;
	overflow-y: auto;
	overflow-x: hidden;
`;
