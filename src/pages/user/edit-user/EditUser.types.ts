import type { SubmitHandler } from 'react-hook-form';

export interface IEditUserForm extends IEditNameForm {
	countryCode?: string;
	email?: string;
	phone?: string;
	whatsapp?: string;
}

export interface IEditNameForm {
	firstName?: string;
	lastName?: string;
}

export type EditUserFormProps = {
	onSubmit: SubmitHandler<IEditUserForm>;
};

export type EditUserFormValues = {
	contacts: {
		email: string;
		hasWhatsApp?: boolean;
		isPhoneWpp?: boolean;
		phone?: string;
		whatsapp?: string;
	};
	firstName: string;
	lastName: string;
	password: string;
};
