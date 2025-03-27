export interface IBigCalendarHeader {
	daysOfWeek: Date[];
	includeHourColumn: boolean;
	totalColumns: number;
	weekDayName: (dayName: Date) => string;
}
