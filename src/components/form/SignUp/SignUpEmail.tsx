import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { ChevronLeft } from '@psycron/components/icons';
import { Link } from '@psycron/components/link/Link';
import { Text } from '@psycron/components/text/Text';
import i18n from '@psycron/i18n';
import { externalUrls } from '@psycron/pages/urls';

import { NameForm } from '../components/name/NameForm';
import { PasswordInput } from '../components/password/PasswordInput';
import { SignLayout } from '../components/shared/SignLayout';
import { InputFields } from '../components/shared/SignLayout.styles';

import {
	SignUpEmailBackButton,
	SignUpEmailBackButtonWrapper,
	SignUpEmailConcentCheckboxLabel,
	StyledSignUpForm,
} from './SignUpEmail.styles';
import type { ISignUpForm, SignUpFormTypes } from './SignUpEmail.types';

export const SignUpEmail = ({
	onSubmit,
	isLoading,
	onBack,
}: SignUpFormTypes) => {
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useFormContext<ISignUpForm>();

	const firstName = watch('firstName');
	const lastName = watch('lastName');
	const email = watch('email');
	const password = watch('password');
	const confirmPassword = watch('confirmPassword');

	const canSubmit =
		Boolean(firstName?.trim()) &&
		Boolean(lastName?.trim()) &&
		Boolean(email?.trim()) &&
		Boolean(password?.trim()) &&
		Boolean(confirmPassword?.trim()) &&
		!isLoading;

	return (
		<SignLayout
			isLoading={isLoading}
			title={t('components.form.signup.title-email')}
		>
			<StyledSignUpForm as='form' onSubmit={handleSubmit(onSubmit)}>
				<SignUpEmailBackButtonWrapper>
					<SignUpEmailBackButton type='button' variant='text' onClick={onBack}>
						<ChevronLeft />
						{t('components.link.navigate.back')}
					</SignUpEmailBackButton>
				</SignUpEmailBackButtonWrapper>
				<NameForm<ISignUpForm> required />
				<InputFields
					label={t('globals.email')}
					fullWidth
					variant='outlined'
					required
					id='email'
					{...register('email')}
					autoComplete='email'
					error={!!errors.email}
					helperText={errors.email?.message}
					maxWidth='100%'
				/>
				<PasswordInput<ISignUpForm> hasToConfirm />

				<Button
					type='submit'
					fullWidth
					size='large'
					disabled={!canSubmit || isLoading}
				>
					{t('components.form.signup.title-email')}
				</Button>
				<Box display='flex' flexDirection='column'>
					<Checkbox
						required
						label={
							<SignUpEmailConcentCheckboxLabel as='span'>
								<Trans
									i18nKey='components.form.consent.terms'
									components={{
										privacyLink: (
											<Link to={externalUrls(i18n.language).PRIVACY} />
										),
										termsLink: <Link to={externalUrls(i18n.language).TERMS} />,
									}}
								/>
							</SignUpEmailConcentCheckboxLabel>
						}
						register={register('consent.termsAccepted', {
							validate: (v) => v || t('components.consent.terms-required'),
						})}
						shouldBold
					/>
					<Checkbox
						label={
							<SignUpEmailConcentCheckboxLabel as='span'>
								<Trans
									i18nKey='components.form.consent.marketing'
									components={{
										marketingLink: (
											<Link to={externalUrls(i18n.language).MARKETING} />
										),
									}}
								/>
							</SignUpEmailConcentCheckboxLabel>
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
