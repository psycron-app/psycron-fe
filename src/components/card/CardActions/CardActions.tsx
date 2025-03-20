import { Box, Grid } from '@mui/material';
import { Button } from '@psycron/components/button/Button';

import type { CardActionsProps } from './CardActions.types';

export const CardActions = ({
	actionName,
	onClick,
	secondAction,
	secondActionName,
	tertiaryAction,
	tertiaryActionName,
	hasTertiary,
	hasSecondAction,
	type,
}: CardActionsProps) => {
	return (
		<Grid container columns={12}>
			<Grid
				marginBottom={hasTertiary ? 2 : 0}
				display='flex'
				columnSpacing={3}
				size={{ xs: 12 }}
			>
				{hasSecondAction ? (
					<Grid size={{ xs: 6 }} display='flex' justifyContent='flex-start'>
						<Button onClick={secondAction} secondary>
							{secondActionName}
						</Button>
					</Grid>
				) : null}
				<Grid
					size={{ xs: hasSecondAction ? 6 : 12 }}
					display='flex'
					justifyContent='flex-end'
				>
					<Button onClick={onClick} type={type}>
						{actionName}
					</Button>
				</Grid>
			</Grid>
			{hasTertiary ? (
				<Grid size={{ xs: 12 }}>
					<Box display='flex' flexDirection='row' justifyContent='flex-end'>
						<Button onClick={tertiaryAction} tertiary>
							{tertiaryActionName}
						</Button>
					</Box>
				</Grid>
			) : null}
		</Grid>
	);
};
