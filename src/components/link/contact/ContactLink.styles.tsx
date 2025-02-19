import { Link, styled } from '@mui/material';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledContactLink = styled(Link)`
	font-size: 1rem;
	padding: 0 ${spacing.space};

	&:hover {
		color: ${palette.secondary.action.hover};
	}
`;
