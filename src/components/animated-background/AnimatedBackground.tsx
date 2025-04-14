import type { RepeatType } from 'framer-motion';

import {
	AnimatedBackgroundWrapper,
	GradientBackground,
	GradientBlob,
} from './AnimatedBackground.styles';

export const AnimatedBackground = () => {
	const getRandomPosition = (max: number) => Math.random() * max - max / 2;

	const primaryAnimation = {
		animate: {
			x: [
				0,
				getRandomPosition(400),
				getRandomPosition(400),
				getRandomPosition(400),
				0,
			],
			y: [
				0,
				getRandomPosition(400),
				getRandomPosition(400),
				getRandomPosition(400),
				0,
			],
			scale: [1, 1.1, 0.9, 1.2, 1],
			rotate: [0, 120, 240, 360],
		},
	};

	const transition = {
		duration: 7,
		ease: 'easeInOut',
		repeat: Infinity,
		repeatType: 'loop' as RepeatType,
	};

	const secondaryAnimation = {
		animate: {
			x: [
				0,
				getRandomPosition(400),
				getRandomPosition(400),
				getRandomPosition(400),
				0,
			],
			y: [
				0,
				getRandomPosition(400),
				getRandomPosition(400),
				getRandomPosition(400),
				0,
			],
			scale: [1, 1.2, 0.8, 1.1, 1],
			rotate: [0, -120, -240, -360],
		},
	};

	return (
		<AnimatedBackgroundWrapper>
			<GradientBackground>
				<GradientBlob
					gradient='primary'
					variants={primaryAnimation}
					animate='animate'
					transition={transition}
				/>
				<GradientBlob
					gradient='secondary'
					variants={secondaryAnimation}
					animate='animate'
					transition={transition}
				/>
			</GradientBackground>
		</AnimatedBackgroundWrapper>
	);
};
