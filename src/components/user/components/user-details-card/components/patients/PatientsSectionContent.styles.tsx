import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowSmallError } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const PatientsCard = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
`;

export const PatientsCardRow = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid ${palette.tertiary.main};
	border-radius: ${spacing.small};
	padding: ${spacing.small};
	background-color: ${palette.tertiary.surface.light};
`;

export const PatientsCardMeta = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.space};
`;

export const PatientsCardValue = styled(Text)`
	font-size: 3rem;
	font-weight: 800;
	line-height: 1;
`;

export const PatientsCardWrapper = styled(Box)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const PatientsCardIcon = styled(Box, {
	shouldForwardProp: (props) => props !== 'alert',
})<{ alert?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.5rem;
	height: 3.5rem;
	border-radius: ${spacing.small};
	box-shadow: ${shadowSmallError};

	background: ${({ alert }) =>
		alert
			? `linear-gradient(
		135deg,
		${palette.error.light},
		${palette.error.main}
	)`
			: `linear-gradient(
		135deg,
		${palette.tertiary.main},
		${palette.brand.purple}
	)`};

	svg {
		color: ${palette.background.default};
	}
`;

export const PatientsEmptyState = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: ${spacing.small};
	padding: ${spacing.small};
	border: 1px solid ${palette.error.main};
	border-radius: ${spacing.small};
	background-color: ${palette.error.surface.light};
`;

export const PatientsEmptyTitle = styled(Text)`
	font-weight: 700;
`;
