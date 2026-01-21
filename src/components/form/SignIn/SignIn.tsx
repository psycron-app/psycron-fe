import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { Divider } from '@psycron/components/divider/Divider';
import { Link } from '@psycron/components/link/Link';
import { Text } from '@psycron/components/text/Text';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { GoogleOAuthButton } from '@psycron/features/auth/google/GoogleOAuthButton';
import { REQPASSRESET } from '@psycron/pages/urls';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import { PasswordInput } from '../components/password/PasswordInput';
import { SignLayout } from '../components/shared/SignLayout';

import { SignInConsentWrapper } from './Signin.styles';
import type { ISignInForm, SignInFormTypes } from './SignIn.types';

export const SignIn = ({ onSubmit }: SignInFormTypes) => {
	const { t } = useTranslation();

	const { isSignInMutationLoading } = useAuth();
	const { locale } = useParams<{ locale: string }>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext<ISignInForm>();

	return (
		<SignLayout
			isSignin
			isLoading={isSignInMutationLoading}
			title={t('components.form.signin.title')}
		>
			<GoogleOAuthButton locale={locale} />
			<Divider />
			<Box
				component='form'
				gap={spacing.small}
				display='flex'
				flexDirection={'column'}
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField
					label={t('globals.email')}
					fullWidth
					variant='outlined'
					id='email'
					{...register('email')}
					autoComplete='email'
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<PasswordInput<ISignInForm> />
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
				>
					<Button type='submit' fullWidth size='large'>
						{t('components.form.signin.sign-in')}
					</Button>
					<SignInConsentWrapper>
						<Checkbox
							labelKey={'components.form.keep-loggedin'}
							register={register('stayConnected')}
						/>
						<Link to={REQPASSRESET}>
							<Text>{t('components.form.signin.forgot-password')}</Text>
						</Link>
					</SignInConsentWrapper>
				</Box>
			</Box>
		</SignLayout>
	);
};
