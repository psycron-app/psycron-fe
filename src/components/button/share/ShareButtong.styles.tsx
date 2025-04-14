import { Box, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowDisabled } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ShareButtonsWrapper = styled(Box)`
	background-color: ${palette.background.default};
	width: auto;
	height: auto;
	position: absolute;

	padding: ${spacing.xs};

	border-radius: 20px;

	display: flex;
	align-items: center;

	filter: ${shadowDisabled};

	right: 10px;

	& > svg {
		color: ${palette.black};
	}
`;
