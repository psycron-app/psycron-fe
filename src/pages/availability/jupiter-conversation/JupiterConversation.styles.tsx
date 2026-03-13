import { Box, styled } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ConversationContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow-y: auto;
	padding: ${spacing.mediumSmall} ${spacing.medium};
	gap: ${spacing.xs};

	${isMobileMedia} {
		padding: ${spacing.small} ${spacing.xs};
	}
`;

export const BotMessageGroup = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.xs};
	align-self: flex-start;
	max-width: 80%;

	${isMobileMedia} {
		max-width: 90%;
	}
`;

export const UserMessageGroup = styled(Box)`
	display: flex;
	flex-direction: column;
	align-self: flex-end;
	max-width: 80%;

	${isMobileMedia} {
		max-width: 90%;
	}
`;

export const BotBubble = styled(Box)`
	background-color: rgba(139, 92, 246, 0.06);
	border-radius: 16px;
	border-bottom-left-radius: 4px;
	padding: 12px 16px;
	font-size: 14px;
	line-height: 1.5;
	color: inherit;

	@keyframes messageFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	animation: messageFadeIn 300ms ease-out;
`;

export const UserBubble = styled(Box)`
	background-color: rgba(139, 92, 246, 0.12);
	border-radius: 16px;
	border-bottom-right-radius: 4px;
	padding: 12px 16px;
	font-size: 14px;
	line-height: 1.5;
	align-self: flex-end;

	animation: messageFadeIn 300ms ease-out;

	@keyframes messageFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const IconRow = styled(Box)`
	display: flex;
	align-items: flex-start;
	gap: ${spacing.xs};
`;

export const ChipsInline = styled(Box)`
	padding-left: 40px;
`;
