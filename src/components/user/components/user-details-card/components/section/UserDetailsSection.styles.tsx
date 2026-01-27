import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { hexToRgba, palette } from '@psycron/theme/palette/palette.theme';
import { shadowSmallPurple } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const UserDetailsSectionContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
`;

export const UserDetailsSectionHeader = styled(Box)`
	display: flex;
	align-items: center;
	gap: ${spacing.xs};
`;

export const UserDetailsSectionIcon = styled(Box)`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	padding: ${spacing.xs};
	border-radius: ${spacing.xs};

	background-color: ${palette.tertiary.light};
	box-shadow: ${shadowSmallPurple};

	svg {
		color: ${palette.brand.purple};
	}
`;

export const UserDetailsSectionTitle = styled(Text)`
	font-weight: 600;
	font-size: 1.2rem;
`;

export const UserDetailsSectionActions = styled(Box)`
	margin-left: auto;
	display: inline-flex;
	align-items: center;
	gap: ${spacing.xs};
`;

export const UserDetailsSectionBody = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	padding: ${spacing.small};
	border-radius: ${spacing.small};
	background-color: ${palette.gray['01']};
	border: 1px solid ${palette.gray['02']};
	box-shadow: inset 0 0 0 1px ${hexToRgba(palette.background.default, 0.35)};
`;
