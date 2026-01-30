import { Box, css, styled } from '@mui/material';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledMenuItem = styled(Tooltip, {
	shouldForwardProp: (prop) => prop !== '$isFooterIcon' && prop !== '$disabled',
})<{
	$disabled?: boolean;
	$isFooterIcon?: boolean;
}>`
	${({ $disabled }) =>
		$disabled
			? css`
					.MuiButtonBase-root {
						color: ${palette.gray['03']};
						background-color: ${palette.gray['01']};
						pointer-events: none;
					}
				`
			: css``}
`;

export const MobileMenuItem = styled(Box, {
	shouldForwardProp: (props) => props !== 'disabled',
})<{ disabled?: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;

	padding-left: ${spacing.xs};
	padding-bottom: ${spacing.small};
	gap: ${spacing.small};

	p {
		color: ${palette.brand.purple};
		font-weight: 500;
	}

	${({ disabled }) =>
		disabled
			? css`
					color: ${palette.gray['03']};
					background-color: ${palette.gray['01']};
					pointer-events: none;

					p {
						color: inherit;
					}
				`
			: css``}

	.MuiAvatar-root {
		width: 50px;
		height: auto;
	}
`;

export const MobileMenuIconWrapper = styled(Box)`
	width: 50px;
	height: auto;
`;
