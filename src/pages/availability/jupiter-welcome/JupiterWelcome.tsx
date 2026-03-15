import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { JupiterScene } from './jupiter-scene/JupiterScene';
import {
	CharacterWrapper,
	GradientText,
	GreetingText,
	StartButton,
	SubtitleText,
	TitleText,
	WelcomeContainer,
} from './JupiterWelcome.styles';

interface JupiterWelcomeProps {
	onStart: () => void;
}

export const JupiterWelcome = ({ onStart }: JupiterWelcomeProps) => {
	const { t } = useTranslation();

	return (
		<WelcomeContainer>
			<CharacterWrapper>
				<JupiterScene />
			</CharacterWrapper>

			<TitleText>
				<GreetingText>
					{t('jupiter.welcome.title-line1')}
				</GreetingText>
				<Box display='flex' gap={1}>
					<GradientText>
						{t('jupiter.welcome.title-line2')}
					</GradientText>
				</Box>
			</TitleText>

			<SubtitleText>{t('jupiter.welcome.subtitle')}</SubtitleText>

			<StartButton onClick={onStart}>
				{t('jupiter.welcome.cta')}
			</StartButton>
		</WelcomeContainer>
	);
};
