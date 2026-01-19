import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUp.types';

import type { RegisterRequestPayload } from '../index.types';

export const mapSignUpFormToRegisterPayload = (
	data: ISignUpForm
): RegisterRequestPayload => {
	const {
		firstName,
		lastName,
		password,
		email,
		stayConnected,
		consent: { termsAccepted, marketingEmailsAccepted },
	} = data;

	return {
		firstName: firstName,
		lastName: lastName,

		email: email,
		password: password,
		contacts: { email: email },
		stayConnected: stayConnected,
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

		consent: {
			termsAccepted,
			privacyPolicyAccepted: termsAccepted,
			marketingEmailsAccepted: marketingEmailsAccepted,
			dataProcessingAccepted: termsAccepted,
		},
	};
};
