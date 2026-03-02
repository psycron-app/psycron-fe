import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { SignIn } from '@psycron/components/form/SignIn/SignIn';
import type { ISignInForm } from '@psycron/components/form/SignIn/SignIn.types';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';

const defaultValues: ISignInForm = {
	email: '',
	password: '',
	stayConnected: false,
};

export const SignInContainer = () => {
	const { signIn } = useAuth();

	const methods = useForm<ISignInForm>({
		defaultValues,
		mode: 'onSubmit',
		shouldUnregister: true,
	});

	const onSubmit: SubmitHandler<ISignInForm> = (data) => {
		signIn(data);
	};

	return (
		<FormProvider {...methods}>
			<SignIn onSubmit={onSubmit} />
		</FormProvider>
	);
};
