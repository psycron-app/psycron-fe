import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const Banner = styled(Box)`
	width: 100%;

	display: flex;
	flex-direction: column;
	background-color: ${palette.alert.light};
	border: 1px solid ${palette.alert.main};
	padding: ${spacing.small};

	position: absolute;
	z-index: 100;
	bottom: 0;
`;

export const BannerHeader = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${spacing.small};
`;

export const IconWrapper = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Actions = styled(Box)`
	display: flex;
	align-items: center;
	gap: ${spacing.xs};
`;

export const Content = styled(Box)`
	padding-top: 2px;
`;
