import { Box, styled, Typography } from '@mui/material';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const SignUpStartGoogleOAuthWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${spacing.small};
`;

export const SignUpStartConsentText = styled(Typography)`
	width: 65%;
	margin: 0;
	text-align: center;
	font-size: 0.75rem;
	line-height: 16px;

	white-space: normal;
	overflow-wrap: anywhere;
	word-break: normal;

	& > a {
		display: inline;
		white-space: nowrap;
	}

	${isMobileMedia} {
		width: 80%;
	}
`;
