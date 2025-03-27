import { Box, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledAgendaPagination = styled(Box)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	position: relative;
	padding-top: ${spacing.small};
`;

export const IcontTodayWrapper = styled(Box)`
	position: absolute;

	& :hover {
		svg {
			color: ${palette.secondary.main};
		}
	}
`;

export const IcontMonthWrapper = styled(Box)`
	position: absolute;
	right: 0;

	& :hover {
		svg {
			color: ${palette.secondary.main};
		}
	}
`;

export const StyledPgButtonWrapper = styled(Box)`
	display: flex;
	justify-content: space-evenly;
	width: 100%;

	& :hover {
		svg {
			color: ${palette.secondary.main};
		}
	}
`;
