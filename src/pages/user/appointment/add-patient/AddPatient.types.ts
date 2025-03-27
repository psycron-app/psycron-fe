export interface ICreatePatientForm {
	countryCode: string;
	email: string;
	firstName: string;
	hasWhatsApp?: boolean;
	isPhoneWpp?: boolean;
	lastName: string;
	phone: string;
	timeZone?: string;
	whatsapp?: string;
}
