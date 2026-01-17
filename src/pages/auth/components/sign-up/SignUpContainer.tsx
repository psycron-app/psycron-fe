import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { SignUp } from '@psycron/components/form/SignUp/SignUp';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUp.types';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';

const defaultValues: ISignUpForm = {
	email: '',
	password: '',
	confirmPassword: '',
	firstName: '',
	lastName: '',
	stayConnected: false,
	consent: {
		termsAccepted: false,
		marketingEmailsAccepted: false,
	},
};

export const SignUpContainer = () => {
	const { signUp } = useAuth();

	const methods = useForm<ISignUpForm>({
		defaultValues,
		mode: 'onSubmit',
		shouldUnregister: true,
	});

	const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
		signUp(data);
	};

	return (
		<FormProvider {...methods}>
			<SignUp onSubmit={onSubmit} />
		</FormProvider>
	);
};
