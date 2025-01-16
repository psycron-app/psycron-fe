import { Box, Grid } from '@mui/material';
import { Divider } from '@psycron/components/divider/Divider';
import useViewport from '@psycron/hooks/useViewport';

import { tableBones } from '../../utils';
import { TableCell } from '../table-cell/TableCell';

import {
	StyledRow,
	TableBodyRow,
	TableBodyRowItem,
	TableBodyWrapper,
} from './TableBody.styles';
import type { ITableBodyProps } from './TableBody.types';

export const TableBody = ({
	bodyItems,
	hoveredColumn,
	isSmall,
}: ITableBodyProps) => {
	const { isTablet, isMobile } = useViewport();

	return (
		<Grid
			container
			columns={bodyItems.length}
			mt={5}
			minHeight={
				isTablet || isMobile ? (isSmall ? 430 : 510) : isSmall ? 450 : 530
			}
		>
			{bodyItems.map((row, rowIndex) => (
				<TableBodyWrapper
					container
					columns={row.length}
					key={`table-row-${rowIndex}`}
				>
					<StyledRow>
						{row.map(
							(
								{
									icon,
									numeric,
									label,
									action,
									isPatients,
									id,
									tooltip,
									iconElements,
									session,
								},
								index
							) => (
								<Grid
									key={`table-cell-${rowIndex}-${index}`}
									item
									xs={tableBones(action, index)}
									display='flex'
								>
									<TableBodyRowItem isHovered={hoveredColumn === id}>
										<TableBodyRow>
											<TableCell
												icon={icon}
												label={label}
												numeric={numeric}
												action={action}
												isPatients={isPatients}
												id={id}
												tooltip={tooltip}
												iconElements={iconElements}
												session={session}
											/>
										</TableBodyRow>
									</TableBodyRowItem>
									{index !== row.length - 1 && !(isTablet || isMobile) ? (
										<Divider small />
									) : null}
								</Grid>
							)
						)}
					</StyledRow>
					{rowIndex !== bodyItems.length - 1 ? (
						<Box width={'100%'} my={2}>
							<Divider small />
						</Box>
					) : null}
				</TableBodyWrapper>
			))}
		</Grid>
	);
};
