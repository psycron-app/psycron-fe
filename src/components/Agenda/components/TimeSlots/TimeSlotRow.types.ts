export interface ITimeSlotsRow {
	availableWeekdays: string[];
	dayHours: string[];
	hour: string;
	isSimple?: boolean;

	selectedWeek?: Date[];
}

export interface AvailabilityFormData {
	selectedSlots: DaySlot[];
}

export interface DaySlot {
	dayName: string;
	slots: Slot[];
}

export type SlotStateAction =
	| { slot: string; type: 'ADD_SLOT'; weekday: string }
	| { slot: string; type: 'REMOVE_SLOT'; weekday: string };

export type Slot = string;

export type SelectedSlots = DaySlot[];

export type OnChange = (updatedSlots: SelectedSlots) => void;
