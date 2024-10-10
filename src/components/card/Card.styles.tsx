import styled from '@emotion/styled';
import { Box, Card as MUICard } from '@mui/material';
import { smallShadow } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const CardWrapper = styled(MUICard, {
	shouldForwardProp: (props) => props !== 'isModal',
})<{ isModal?: boolean }>`
	box-shadow: ${smallShadow};
	margin: ${spacing.mediumSmall} ${spacing.small};
`;

export const Content = styled(Box)`
	min-height: 5rem;
	padding: ${spacing.small};
	text-align: left;
	padding-top: ${spacing.medium};
`;
