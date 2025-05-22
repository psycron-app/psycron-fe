import { Box, styled, TextField } from '@mui/material';
import { Send } from '@psycron/components/icons';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const Prompt = () => {
	return (
		<Box width={'100%'}>
			<TextField multiline fullWidth />
		</Box>
	);
};

export const PromptWrapper = styled(Box)`
	display: flex;
	align-items: center;
	padding: ${spacing.small} ${spacing.mediumSmall};
`;

export const SendPromptIconWrapper = styled(Box)`
	margin-left: ${spacing.xs};

	> svg {
		rotate: 270deg;
		/* color: ${palette.primary.main}; */
	}
`;
