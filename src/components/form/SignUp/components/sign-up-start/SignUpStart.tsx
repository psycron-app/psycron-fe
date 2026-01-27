import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button } from '@psycron/components/button/Button';
import { Divider } from '@psycron/components/divider/Divider';
import { SignLayout } from '@psycron/components/form/components/shared/SignLayout';
import { Link } from '@psycron/components/link/Link';
import { GoogleOAuthButton } from '@psycron/features/auth/google/GoogleOAuthButton';
import i18n from '@psycron/i18n';
import { externalUrls } from '@psycron/pages/urls';

import {
	SignUpStartConsentText,
	SignUpStartGoogleOAuthWrapper,
} from './SignUpStart.styles';
import type { SignUpStartProps } from './SignUpStart.types';

export const SignUpStart = ({ onContinueWithEmail }: SignUpStartProps) => {
	const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();

	return (
		<SignLayout title={t('components.form.signup.title')}>
			<SignUpStartGoogleOAuthWrapper>
				<GoogleOAuthButton locale={locale} intent='signup' />
				<SignUpStartConsentText as='p' variant='caption'>
					<Trans
						i18nKey='components.form.consent.info'
						components={{
							privacyLink: <Link to={externalUrls(i18n.language).PRIVACY} />,
							termsLink: <Link to={externalUrls(i18n.language).TERMS} />,
						}}
					/>
				</SignUpStartConsentText>
			</SignUpStartGoogleOAuthWrapper>
			<Divider />
			<Button
				fullWidth
				size='large'
				variant='outlined'
				onClick={onContinueWithEmail}
			>
				{t('auth.continue-email')}
			</Button>
		</SignLayout>
	);
};
