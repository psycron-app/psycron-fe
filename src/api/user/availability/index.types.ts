export interface IInitiateAvailabilityResponse {
	sessionId: string;
}

export interface IAvailabilityData {
	consultationDuration?: number;
	step?: number;
	therapistId: string;
	weekdays?: string[];
}

export interface IUpdateAvailabilitySession {
	data: Partial<IAvailabilityData>;
	sessionId: string;
}

export interface ISessionResponse {
	_id: string;
	completed: boolean;
	consultationDuration: number;
	createdAt: Date;
	step: number;
	updatedAt: Date;
	weekdays: IWeekdays[];
}

export type IWeekdays =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

export interface ICompleteSessionAvailabilityData {
	selectedSlots: string[];
	sessionId: string;
}

export interface ICompleteSessionAvailabilityResponse {
	availability: {
		_id: string;
		availabilityDates: Array<{
			date: string;
			slots: Array<{
				endTime: string;
				note?: string;
				startTime: string;
				status: 'AVAILABLE' | 'BLOCKED' | 'BOOKED';
			}>;
		}>;
		consultationDuration: number;
		createAvailabilitySession: string;
		createdAt: string;
		therapistId: string;
		updatedAt: string;
	};
	status: string;
}
