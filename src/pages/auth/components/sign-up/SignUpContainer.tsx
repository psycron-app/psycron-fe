import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { SignUpStart } from '@psycron/components/form/SignUp/components/sign-up-start/SignUpStart';
import { SignUpEmail } from '@psycron/components/form/SignUp/SignUpEmail';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUpEmail.types';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';

type SignUpStep = 'start' | 'email';

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
	const { signUp, isSignUpMutationLoading } = useAuth();
	const [step, setStep] = useState<SignUpStep>('start');

	const methods = useForm<ISignUpForm>({
		defaultValues,
		mode: 'onSubmit',
		shouldUnregister: false,
	});

	const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
		signUp(data);
	};

	return (
		<FormProvider {...methods}>
			{step === 'start' ? (
				<SignUpStart onContinueWithEmail={() => setStep('email')} />
			) : (
				<SignUpEmail
					onSubmit={onSubmit}
					isLoading={isSignUpMutationLoading}
					onBack={() => setStep('start')}
				/>
			)}
		</FormProvider>
	);
};
