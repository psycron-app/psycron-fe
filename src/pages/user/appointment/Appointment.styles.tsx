import { Box, ListItem, ListItemIcon, styled } from '@mui/material';
import { isBiggerThanTabletMedia } from '@psycron/theme/media-queries/mediaQueries';
import { shadowPress } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ListWrapper = styled(Box)`
	padding-top: ${spacing.mediumLarge};
`;

export const StyledListItem = styled(ListItem)`
	flex-direction: column;
`;

export const ListItemTitleWrapper = styled(Box)`
	display: flex;
	align-items: center;

	padding-right: ${spacing.xs};
	width: 100%;

	${isBiggerThanTabletMedia} {
		min-width: 18.75rem;
	}
`;

export const StyledListItemIcon = styled(ListItemIcon)`
	justify-content: center;

	svg {
		box-shadow: ${shadowPress};
		padding: ${spacing.space};
		border-radius: 50%;
		width: 1.875rem;
		height: 1.875rem;
	}
`;

export const StyledProceedContainer = styled(Box)`
	display: flex;
	justify-content: flex-end;
	padding-top: ${spacing.mediumLarge};

	${isBiggerThanTabletMedia} {
		position: fixed;
		bottom: 0;
		right: 0;
		padding-bottom: ${spacing.mediumLarge};
	}
`;
