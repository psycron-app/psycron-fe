import { Box, css, styled } from '@mui/material';
import { isBiggerThanMediumMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ChatMessageWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'isBot',
})<{ isBot: boolean }>`
	max-width: 90%;
	border-radius: 35px;

	display: flex;

	${isBiggerThanMediumMedia} {
		max-width: 50%;
	}

	${({ isBot }) =>
		isBot
			? css`
					align-self: flex-start;
					border-bottom-left-radius: 0;
					border: 5px solid ${palette.primary.main};
				`
			: css`
					align-self: flex-end;
					border-bottom-right-radius: 0;
					border: 5px solid ${palette.secondary.main};
				`}
`;

export const ChatMessageContent = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: flex;
	padding: ${spacing.small};
	border-radius: 20px;
	border-bottom-left-radius: 0;
`;

export const StyledIconWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 3rem;
	height: 3rem;

	padding: ${spacing.xs};
	border-radius: 50px;

	margin-right: ${spacing.small};

	box-shadow: ${shadowMain};

	& > svg {
		width: 1.5rem;
		height: 1.5rem;
	}
`;
