import type { ITableCellProps } from '../table-cell/TableCell.types';

export interface ITableHeadProps {
	headItems: ITableCellProps[];
	isSmall?: boolean;
	onHover?: (id: string | null) => void;
	onSort?: (id: string) => void;
}
