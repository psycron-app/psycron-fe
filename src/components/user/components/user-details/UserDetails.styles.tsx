import { Box, css, DialogActions, DialogContent, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const UserDetailsTop = styled(Box)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	padding: ${spacing.mediumSmall} 0;
`;

export const NameEmailBox = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const UserDetailsItems = styled(Box)`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const UserDetailsItemWrapper = styled(Box)`
	display: flex;
	padding: ${spacing.mediumSmall} 0;
	justify-content: space-between;
`;

export const Item = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const ItemWrapper = styled(Box)`
	display: flex;
	align-items: flex-start;

	a {
		margin: 0;
	}
	svg {
		margin-right: ${spacing.small};
	}
`;

export const StyledUserDetailsLinks = styled(Box)`
	display: flex;

	height: ${spacing.small};
	color: ${palette.secondary.main};

	span {
		font-weight: 500;
		&::first-letter {
			text-transform: uppercase;
		}
	}

	&:hover {
		cursor: pointer;
	}
`;

export const DownloadWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'disabled',
})<{ disabled?: boolean }>`
	height: 5rem;
	width: 5rem;

	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;
	border: 0;

	& > svg {
		width: 100%;
		height: auto;
		color: ${palette.brand.purple};
		border-radius: 50%;
		padding: ${spacing.xxs};

		${({ disabled }) =>
			disabled &&
			css`
				color: ${palette.tertiary.action.disabled};
			`}

		&:hover {
			cursor: pointer;
			color: ${palette.brand.dark};
		}
	}
`;

export const DeleteAccountDialogContent = styled(DialogContent)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const DeleteDialogActions = styled(DialogActions)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
