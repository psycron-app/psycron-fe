import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
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

	useEffect((): void => {
		capture('auth sign up step viewed', {
			step,
			audience: 'therapist',
		});
	}, [step]);

	const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
		capture('auth sign up started', {
			method: 'email',
			audience: 'therapist',
			stay_connected: data.stayConnected,
			terms_accepted: data.consent.termsAccepted,
			marketing_emails_accepted: data.consent.marketingEmailsAccepted,
		});

		signUp(data);
	};

	const onContinueWithEmail = (): void => {
		capture('auth sign up continue with email clicked', {
			audience: 'therapist',
		});
		setStep('email');
	};

	const onBack = (): void => {
		capture('auth sign up email back clicked', {
			audience: 'therapist',
		});
		setStep('start');
	};

	return (
		<FormProvider {...methods}>
			{step === 'start' ? (
				<SignUpStart onContinueWithEmail={onContinueWithEmail} />
			) : (
				<SignUpEmail
					onSubmit={onSubmit}
					isLoading={isSignUpMutationLoading}
					onBack={onBack}
				/>
			)}
		</FormProvider>
	);
};
