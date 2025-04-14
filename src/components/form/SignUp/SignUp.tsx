import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';

import { NameForm } from '../components/name/NameForm';
import { PasswordInput } from '../components/password/PasswordInput';
import { SignLayout } from '../components/shared/SignLayout';
import { InputFields } from '../components/shared/styles';

import type { SignUpFormTypes } from './SignUp.types';

export const SignUp = ({
	handleSubmit,
	errors,
	onSubmit,
	register,
}: SignUpFormTypes) => {
	const { t } = useTranslation();

	const { isSignUpMutationLoading } = useAuth();

	return (
		<SignLayout isLoading={isSignUpMutationLoading}>
			<Box component='form' onSubmit={handleSubmit(onSubmit)}>
				<NameForm errors={errors} register={register} />
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
				<PasswordInput errors={errors} register={register} hasToConfirm />
				<Box pt={4}>
					<Button type='submit' fullWidth>
						{t('components.form.signup.title')}
					</Button>
				</Box>
				<Box>
					<Checkbox
						labelKey={t('components.form.keep-loggedin')}
						register={register('stayConnected')}
					/>
				</Box>
			</Box>
		</SignLayout>
	);
};
