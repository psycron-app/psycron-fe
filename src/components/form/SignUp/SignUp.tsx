import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { Link } from '@psycron/components/link/Link';
import { Text } from '@psycron/components/text/Text';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { GoogleOAuthButton } from '@psycron/features/auth/google/GoogleOAuthButton';
import i18n from '@psycron/i18n';
import { externalUrls } from '@psycron/pages/urls';

import { NameForm } from '../components/name/NameForm';
import { PasswordInput } from '../components/password/PasswordInput';
import { SignLayout } from '../components/shared/SignLayout';
import { InputFields } from '../components/shared/styles';

import { StyledSignUpForm } from './SignUp.styles';
import type { ISignUpForm, SignUpFormTypes } from './SignUp.types';

export const SignUp = ({ onSubmit }: SignUpFormTypes) => {
	const { t } = useTranslation();
	const { isSignUpMutationLoading } = useAuth();
	const { locale } = useParams<{ locale: string }>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext<ISignUpForm>();

	return (
		<SignLayout isLoading={isSignUpMutationLoading}>
			<StyledSignUpForm as='form' onSubmit={handleSubmit(onSubmit)}>
				<NameForm<ISignUpForm> required />
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
				<PasswordInput<ISignUpForm> hasToConfirm />

				<Button type='submit' fullWidth>
					{t('components.form.signup.title')}
				</Button>
				<GoogleOAuthButton locale={locale} />
				<Box display='flex' flexDirection='column'>
					<Checkbox
						labelKey={'components.form.keep-loggedin'}
						register={register('stayConnected')}
					/>
					<Checkbox
						label={
							<Trans
								i18nKey='components.form.consent.terms'
								components={{
									privacyLink: (
										<Link to={externalUrls(i18n.language).PRIVACY} />
									),
									termsLink: <Link to={externalUrls(i18n.language).TERMS} />,
								}}
							/>
						}
						register={register('consent.termsAccepted', {
							validate: (v) => v || t('components.consent.terms-required'),
						})}
						shouldBold
					/>
					<Checkbox
						label={
							<Trans
								i18nKey='components.form.consent.marketing'
								components={{
									marketingLink: (
										<Link to={externalUrls(i18n.language).MARKETING} />
									),
								}}
							/>
						}
						register={register('consent.marketingEmailsAccepted')}
					/>
					<Text color='error' height='1.5rem'>
						{errors.consent?.termsAccepted?.message
							? String(errors.consent.termsAccepted.message)
							: null}
					</Text>
				</Box>
			</StyledSignUpForm>
		</SignLayout>
	);
};
