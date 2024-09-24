import { Box, css, Grid, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';

export const StyledGridHours = styled(Grid)`
	width: 3.125rem;
	text-align: center;
`;

export const StyledHoursWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledGridSlots = styled(Grid, {
	shouldForwardProp: (props) =>
		props !== 'isAvailable' && props !== 'isBooked' && props !== 'isSelected',
})<{ isAvailable: boolean; isBooked: boolean; isSelected: boolean }>`
	height: 3.125rem;
	width: 3.125rem;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 4px;

	${({ isAvailable }) =>
		isAvailable
			? css`
					border: 1px solid ${palette.success.main};
				`
			: css`
					border: 1px solid ${palette.gray['02']};
				`}

	${({ isBooked }) =>
		isBooked &&
		css`
			border: 1px solid ${palette.alert.main};
		`}


	${({ isSelected }) =>
		isSelected &&
		css`
			border: 1px solid ${palette.info.main};
			background-color: ${palette.info.light};
		`}
`;

export const StyledSlotsWrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
`;
