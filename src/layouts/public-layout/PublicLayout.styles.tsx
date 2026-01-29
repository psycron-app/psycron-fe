import { Box, styled } from '@mui/material';

export const PublicLayoutWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	width: 100%;

	min-height: 100vh;
`;

export const PublicLayoutContent = styled(Box)`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0;
	z-index: 2;

	flex: 1;
	margin-bottom: var(--footer-height);
`;
