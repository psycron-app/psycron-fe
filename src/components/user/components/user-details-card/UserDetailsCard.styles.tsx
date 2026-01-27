import {
	Box,
	css,
	DialogActions,
	DialogContent,
	keyframes,
	styled,
} from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { hexToRgba, palette } from '@psycron/theme/palette/palette.theme';
import {
	shadowMain,
	shadowSmallPurple,
} from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

const blurIn = keyframes`
0% {
    filter:blur(12px);
    opacity:0
}
100% {
    filter:blur(0);
    opacity:1
}
`;

export const UserDetailsCardWrapper = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible?: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	right: auto;

	width: 34.375rem;
	max-height: calc(98dvh - (2 * ${spacing.medium}));
	min-height: 0;

	display: flex;
	flex-direction: column;
	overflow: hidden;

	padding: 0;
	border-radius: calc(2 * ${spacing.medium});
	border-top-left-radius: 0;
	box-shadow: ${shadowMain};
	backdrop-filter: blur(10px);
	z-index: 100;
	border: 2px solid rgba(233, 214, 255, 0.1);

	${({ isVisible }) =>
		isVisible &&
		css`
			animation: ${blurIn} 0.09s linear both;
		`}

	${isMobileMedia} {
		left: 0;
		top: 0;
		width: 100%;
		max-height: calc(98dvh - (2 * ${spacing.xl}));
	}
`;

export const UserDetailsCardTop = styled(Box)`
	padding: ${spacing.mediumSmall};
	border-top-right-radius: calc(2 * ${spacing.medium});
	background-color: ${hexToRgba(palette.tertiary.main, 0.5)};
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	${isMobileMedia} {
		padding: ${spacing.small};
	}
`;

export const UserDestailsTopInfo = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const UserDetailsTopActionsWrapper = styled(Box)`
	display: flex;
	flex-direction: row;
	gap: ${spacing.space};
`;

export const UserDetailsTopActionButton = styled(Box)`
	padding: ${spacing.space};
	background-color: ${palette.background.default};
	border-radius: ${spacing.small};
	box-shadow: ${shadowSmallPurple};
	height: min-content;

	${isMobileMedia} {
		& button {
			padding: ${spacing.space};
		}
	}
`;

export const UserDetailsSectionWrapper = styled(Box)`
	padding: 0;
`;

export const UserDetailsBody = styled(Box)`
	display: flex;
	flex-direction: column;
	padding: ${spacing.small};
	gap: ${spacing.small};
	position: relative;
	flex: 1;
	min-height: 0;
	overflow-y: auto;
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
