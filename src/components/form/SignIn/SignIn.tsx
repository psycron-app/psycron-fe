import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { Link } from '@psycron/components/link/Link';
import { Text } from '@psycron/components/text/Text';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { REQPASSRESET } from '@psycron/pages/urls';

import { PasswordInput } from '../components/password/PasswordInput';
import { SignLayout } from '../components/shared/SignLayout';
import { InputFields } from '../components/shared/styles';

import type { ISignInForm, SignInFormTypes } from './SignIn.types';

export const SignIn = ({ onSubmit }: SignInFormTypes) => {
	const { t } = useTranslation();

	const { isSignInMutationLoading } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext<ISignInForm>();

	return (
		<SignLayout isSignin isLoading={isSignInMutationLoading}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<InputFields
					label={t('globals.email')}
					fullWidth
					id='email'
					{...register('email')}
					autoComplete='email'
					error={!!errors.email}
					helperText={errors.email?.message}
					maxWidth='100%'
				/>
				<PasswordInput<ISignInForm> errors={errors} register={register} />
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
					pt={4}
				>
					<Button type='submit' fullWidth>
						{t('components.form.signin.title')}
					</Button>
					<Box>
						<Checkbox
							labelKey={'components.form.keep-loggedin'}
							register={register('stayConnected')}
						/>
					</Box>
					<Box>
						<Link to={REQPASSRESET}>
							<Text variant='caption'>
								{t('components.form.signin.forgot-password')}
							</Text>
						</Link>
					</Box>
				</Box>
			</Box>
		</SignLayout>
	);
};
