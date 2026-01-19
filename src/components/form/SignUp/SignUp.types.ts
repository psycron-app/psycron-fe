import type { SubmitHandler } from 'react-hook-form';

export interface ISignUpForm {
	confirmPassword?: string;
	consent: {
		marketingEmailsAccepted: boolean;
		termsAccepted: boolean;
	};
	email: string;
	firstName?: string;
	lastName?: string;
	password: string;
	stayConnected?: boolean;
}
export type SignUpFormTypes = {
	onSubmit: SubmitHandler<ISignUpForm>;
};
