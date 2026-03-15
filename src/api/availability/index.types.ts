export interface IAvailabilityRecord {
	availabilityId: string;
	googleCalendarConnected?: boolean;
	sessionDuration: string;
	sessionType: string;
	timeRange: string;
	timezone: string;
	workingDays: string[];
}
