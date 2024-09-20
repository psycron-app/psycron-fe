export interface ITimeSlotsRow {
	availableWeekdays: DaySlot[];
	dayHours: string[];
	hour: string;
	isSimple?: boolean;
	selectedWeek?: Date[];
}

export interface AvailabilityFormData {
	selectedSlots: DaySlot[];
}

export interface DaySlot {
	dayName: IWeekdaysNames;
	slots: Slot[];
}

export type IWeekdaysNames =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

export type Slot = string;

export type SelectedSlots = DaySlot[];

export type OnChange = (updatedSlots: SelectedSlots) => void;

export type setValue = (name: string, value: unknown) => void;
