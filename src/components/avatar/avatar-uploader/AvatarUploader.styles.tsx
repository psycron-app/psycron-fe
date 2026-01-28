import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowSmallPurple } from '@psycron/theme/shadow/shadow.theme';

export const AvatarUploaderWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	position: relative;
`;

export const AvatarUploaderButton = styled(IconButton)`
	position: absolute;
	bottom: 0;
	right: 0;

	background-color: ${palette.background.default};
	box-shadow: ${shadowSmallPurple};

	:hover {
		background-color: ${palette.tertiary.light};
		color: ${palette.brand.purple};
	}
`;
