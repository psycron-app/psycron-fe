import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import {
	shadowMediumPurple,
	shadowPress,
} from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const WelcomeContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	min-height: calc(100vh - 64px);
	text-align: center;
`;

export const CharacterWrapper = styled(Box)`
	width: auto;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${isMobileMedia} {
		width: 100%;
	}
`;

export const TitleText = styled(Box)`
	margin-bottom: ${spacing.extraSmall};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const GradientText = styled(Text)`
	font-weight: 700;
	font-size: 32px;
	background:
		radial-gradient(ellipse at top, #8de8ff, transparent),
		radial-gradient(ellipse at center, #ff79fd, transparent),
		radial-gradient(ellipse at bottom, #5702ff, transparent);

	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export const SubtitleText = styled(Typography)`
	font-size: 18px;
	color: ${palette.gray['05']};
	width: 30%;
	line-height: 1.5;
	margin-bottom: ${spacing.large};

	${isMobileMedia} {
		width: 100%;
	}
`;

export const StartButton = styled(Button)`
	border-radius: 40px;
	border: 2px solid ${palette.brand.purple};
	background-color: ${palette.background.default};
	color: ${palette.text.primary};
	font-size: 22px;
	font-weight: 500;
	padding: ${spacing.xs} ${spacing.large};
	text-transform: none;
	min-width: 170px;
	min-height: 50px;
	box-shadow: ${shadowMediumPurple};

	transition: all 0.2s ease;

	&:hover {
		background-color: ${palette.brand.light};
		border-color: ${palette.brand.dark};
		box-shadow: ${shadowPress};
	}
`;

export const GreetingText = styled(Text)`
	font-size: 32px;
`;
