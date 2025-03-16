import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const TitleWrapper = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const CardTitleWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'hasTitle',
})<{ hasTitle?: boolean }>`
	display: flex;
	justify-content: space-between;
	padding: ${spacing.small};

	padding-bottom: ${({ hasTitle }) => (hasTitle ? spacing.small : 0)};
`;
