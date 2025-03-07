import { Box, css, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { zIndexHover } from '@psycron/theme/zIndex';

export const HourSlotWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'isHighlighted',
})<{ isHighlighted: boolean }>`
	position: relative;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 101;
	width: 100%;

	border-top: ${({ isHighlighted }) =>
		isHighlighted
			? `${spacing.space} solid ${palette.info.main}`
			: `1px dashed ${palette.gray['02']}`};

	${({ isHighlighted }) =>
		isHighlighted &&
		css`
			border-left: ${spacing.space} solid ${palette.info.main};
			border-top-left-radius: ${spacing.mediumSmall};
			border-bottom-left-radius: ${spacing.mediumSmall};
			border-top: ${spacing.space} solid ${palette.info.main};
			border-bottom: ${spacing.space} solid ${palette.info.main};
			z-index: ${zIndexHover};
		`}
`;
