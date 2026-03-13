export type JupiterStep =
	| 'calendar-choice'
	| 'working-days'
	| 'time-range'
	| 'session-duration'
	| 'session-type'
	| 'timezone'
	| 'preview'
	| 'google-permissions'
	| 'google-success'
	| 'done';

export interface JupiterAnswers {
	calendarChoice?: 'google' | 'manual';
	sessionDuration?: string;
	sessionType?: string;
	timeRange?: string;
	timezone?: string;
	timezoneConfirmed?: boolean;
	workingDays?: string[];
}

export interface JupiterMessage {
	content: string;
	sender: 'bot' | 'user';
	showIcon?: boolean;
}
