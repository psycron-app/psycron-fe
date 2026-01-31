import styled from '@emotion/styled';
import { css, IconButton } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowSmallPurple } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const TootleTipIconButton = styled(IconButton, {
	shouldForwardProp: (props) => props !== 'disabled',
})<{ disabled?: boolean }>`
	border-radius: ${spacing.small};

	${({ disabled }) =>
		disabled
			? css`
					pointer-events: none;
					opacity: 0.55;
					color: ${palette.gray['03']};
				`
			: css`
					:hover {
						background-color: ${palette.brand.purple};
						color: ${palette.background.default};
						box-shadow: ${shadowSmallPurple};
					}
				`}
`;
