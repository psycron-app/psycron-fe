 
import type { ReactElement } from 'react';
import React from 'react';
import { Box, Grid } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Close } from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { palette } from '@psycron/theme/palette/palette.theme';

import {
	CardTitleWrapper,
	CloseButtonWrapper,
	TitleWrapper,
} from './CardTitle.styles';
import type { CardTitleProps } from './CardTitle.types';

export const CardTitle = ({
	title,
	subheader,
	firstChip,
	firstChipName,
	hasFirstChip,
	hasSecondChip,
	secondChip,
	secondChipName,
	firstChipTooltip,
	onClose = () => {},
}: CardTitleProps) => {
	return (
		<CardTitleWrapper hasTitle={title?.length > 0}>
			<Grid
				container
				justifyContent='space-between'
				alignItems='center'
				width='100%'
			>
				<Grid size={hasFirstChip ? 8 : 12} width='100%'>
					<TitleWrapper>
						<Text
							variant='h5'
							isFirstUpper
							textAlign='left'
							fontSize={'1rem'}
							fontWeight={600}
						>
							{title}
						</Text>
						{subheader?.length ? (
							<Text
								variant='subtitle1'
								color={palette.text.secondary}
								isFirstUpper
							>
								{subheader}
							</Text>
						) : null}
						{onClose && (
							<CloseButtonWrapper onClick={onClose}>
								<Close />
							</CloseButtonWrapper>
						)}
					</TitleWrapper>
				</Grid>
				{hasFirstChip ? (
					<Grid size={4} display='flex' justifyContent='flex-end'>
						{firstChipName ? (
							typeof firstChipName === 'string' ||
							typeof firstChipName === 'number' ? (
								<Box>
									<Button onClick={firstChip} small>
										{firstChipName}
									</Button>
								</Box>
							) : React.isValidElement(firstChipName) ? (
								<Tooltip title={firstChipTooltip}>
									{firstChipName as ReactElement}
								</Tooltip>
							) : null
						) : null}
						{hasSecondChip ? (
							<Box pl={2}>
								<Button onClick={secondChip} small secondary>
									{secondChipName}
								</Button>
							</Box>
						) : null}
					</Grid>
				) : null}
			</Grid>
		</CardTitleWrapper>
	);
};
