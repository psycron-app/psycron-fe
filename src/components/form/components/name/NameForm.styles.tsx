import { Box, styled, TextField } from '@mui/material';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const NameFormWrapper = styled(Box)`
	display: flex;
	width: 100%;

	flex-direction: column;
	padding-bottom: ${spacing.xs};
`;

export const StyledNameInput = styled(TextField)`
	padding-bottom: ${spacing.medium};
`;
