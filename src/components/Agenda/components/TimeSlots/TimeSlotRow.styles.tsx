import { Box, css, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';

export const StyledHourColl = styled(Grid)`
	background-color: ${palette.background.default};

	border-radius: 4px;
	border: 1px solid ${palette.gray['04']};
	border-bottom: 0;
	border-right: 0;

	width: 3.125rem;

	&:first-of-type {
		border-top: 0;
	}
`;

export const HourCollWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledDaySlots = styled(Grid)`
	height: 3.125rem;
	width: 3.125rem;
	text-align: center;
`;

export const SlotBox = styled(Box, {
	shouldForwardProp: (props) =>
		props !== 'isSelected' && props !== 'disabled' && props !== 'isCurrentDay',
})<{ disabled: boolean; isCurrentDay: boolean; isSelected: boolean }>`
	width: 100%;
	height: 100%;
	border-radius: 4px;
	border: 1px solid ${palette.gray['04']};
	cursor: pointer;

	${({ disabled, isSelected }) =>
		disabled
			? css`
					background-color: ${palette.gray['04']};
					cursor: not-allowed;
				`
			: isSelected
				? css`
						background-color: ${palette.secondary.main};
					`
				: css`
						background-color: ${palette.gray['01']};
					`}

	${({ isCurrentDay }) =>
		isCurrentDay &&
		css`
			border: 4px solid ${palette.primary.main};
		`}
`;
