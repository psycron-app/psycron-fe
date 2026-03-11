import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const float = keyframes`
	0%, 100% { transform: translateY(0px); }
	50% { transform: translateY(-16px); }
`;

export const SceneContainer = styled(Box)`
	width: 350px;
	height: 350px;
	position: relative;
	animation: ${float} 4s ease-in-out infinite;
	will-change: transform;
`;
