import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const SecurityRowsContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	width: 100%;
`;

export const PasswordDots = styled(Text)`
	font-weight: 600;
	letter-spacing: 0.12em;
`;

export const ManagedByProviderCallout = styled(Box)`
	display: flex;
	align-items: flex-start;
	gap: ${spacing.small};

	padding: ${spacing.small};
	border-radius: ${spacing.small};

	background-color: ${palette.tertiary.surface.light};
	border: 1px solid ${palette.tertiary.main};

	svg {
		color: ${palette.tertiary.main};
		width: 45px;
	}
`;

export const ManagedByProviderText = styled(Text)`
	font-weight: 500;
	text-align: left;
`;

export const ConsentBlock = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.xs};

	padding: ${spacing.small};
	border-radius: ${spacing.small};

	background-color: ${palette.gray['01']};
	border: 1px solid ${palette.gray['02']};
`;

export const ConsentAcceptedInfo = styled(Box)`
	display: block;

	white-space: normal;
	overflow-wrap: anywhere;

	${isMobileMedia} {
		font-size: 0.75rem;
	}

	& span {
		font-size: inherit;
	}

	& a {
		display: inline;
		font-size: inherit;
		font-weight: 500;
	}
`;

export const ConsentInfo = styled(Text)`
	color: ${palette.text.secondary};
	margin-top: ${spacing.mediumSmall};
	font-size: 0.9rem;
`;
