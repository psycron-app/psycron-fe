import { bubbleStyle, LoaderBubblesWrapper } from './LoaderBubbles.styles';

export const LoaderBubbles = () => (
	<LoaderBubblesWrapper>
		<div css={bubbleStyle('0s')} />
		<div css={bubbleStyle('0.2s')} />
		<div css={bubbleStyle('0.4s')} />
	</LoaderBubblesWrapper>
);
