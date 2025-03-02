export interface IWeekDaysHeader {
	hoveredColumnIndex: number | null;
	isSimple?: boolean;
	onColumnClick: (columnIndex: number) => void;
	onColumnHover: (columnIndex: number) => void;
	selectedDay?: Date;
}
