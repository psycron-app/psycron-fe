import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { JupiterScene } from './jupiter-scene/JupiterScene';
import {
	CharacterWrapper,
	GradientText,
	GreettingText,
	SpeechBubbleWrapper,
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
				<SpeechBubbleWrapper></SpeechBubbleWrapper>
				<JupiterScene />
			</CharacterWrapper>

			<TitleText>
				<Box display='flex'>
					<GreettingText>
						{t('chat.jupiter.welcome.title-prefix')}
					</GreettingText>
					<GreettingText fontWeight={600} px={1}>
						{t('chat.jupiter.welcome.title-name') + ','}
					</GreettingText>
				</Box>
				<Box display='flex'>
					<GreettingText>{t('chat.jupiter.welcome.title-your')}</GreettingText>
					<GradientText px={2}>
						{t('chat.jupiter.welcome.title-highlight')}
					</GradientText>
				</Box>
			</TitleText>

			<SubtitleText>{t('chat.jupiter.welcome.subtitle')}</SubtitleText>

			<StartButton onClick={onStart}>
				{t('chat.jupiter.welcome.cta')}
			</StartButton>
		</WelcomeContainer>
	);
};
