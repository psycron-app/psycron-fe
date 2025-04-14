export interface ICreatePatientForm {
	countryCode: string;
	email: string;
	firstName: string;
	hasWhatsApp?: boolean;
	isPhoneWpp?: boolean;
	lastName: string;
	phone: string;
	recurrencePattern?: RecurrencePattern;
	timeZone?: string;
	whatsapp?: string;
}

export enum RecurrencePattern {
	ALL_APPOINTMENTS = 'allAppointments',
	SINGLE = 'single',
	UNTIL_END_OF_MONTH = 'endMonth',
	UNTIL_END_OF_YEAR = 'endYear',
}
