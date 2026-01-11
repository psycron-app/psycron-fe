import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { MobileMenuItem, StyledMenuItem } from './MenuItem.styles';
import type { IMenuItem } from './MenuItem.types';

export const MenuItem = ({
	icon,
	name,
	isFooterIcon,
	isFullList,
	disabled,
	open,
}: IMenuItem) => {
	const [shouldOpenTooltip, setShouldOpenTooltip] = useState<boolean>(false);

	useEffect(() => {
		if (open) {
			const timeout = setTimeout(() => setShouldOpenTooltip(true), 100);
			return () => clearTimeout(timeout);
		}
	}, [open]);

	return (
		<>
			{isFullList ? (
				<MobileMenuItem disabled={disabled}>
					<Box>{icon}</Box>
					<Box>
						<Typography variant='subtitle1' textTransform='capitalize'>
							{name}
						</Typography>
					</Box>
				</MobileMenuItem>
			) : (
				<StyledMenuItem
					title={name}
					placement='right'
					disabled={disabled}
					isFooterIcon={isFooterIcon}
					open={shouldOpenTooltip || undefined}
				>
					{icon}
				</StyledMenuItem>
			)}
		</>
	);
};
