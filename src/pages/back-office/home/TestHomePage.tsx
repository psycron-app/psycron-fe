import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { SignLayout } from '@psycron/components/form/components/shared/SignLayout';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { GoogleOAuthButton } from '@psycron/features/auth/google/GoogleOAuthButton';

import { AuthPageWrapper } from '../../auth/index.styles';
import { SIGNIN } from '../../urls';

export const TestHomePage = () => {
	const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();
	const navigate = useNavigate();

	const methods = useForm({
		mode: 'onSubmit',
		shouldUnregister: true,
	});

	const { isSignInMutationLoading } = useAuth();

	const isTestEnv = window.location.hostname.startsWith('test.');

	useEffect(() => {
		if (!isTestEnv) {
			navigate(SIGNIN);
		}
	}, [isTestEnv, navigate]);

	return (
		<AuthPageWrapper>
			<SignLayout title={t('components.form.signin.title')}>
				<FormProvider {...methods}>
					<GoogleOAuthButton
						locale={locale}
						intent='signin'
						disabled={isSignInMutationLoading}
					/>
				</FormProvider>
			</SignLayout>
		</AuthPageWrapper>
	);
};
