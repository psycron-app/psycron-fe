import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import { SignLayout } from '@psycron/components/form/components/shared/SignLayout';
import { useRuntimeEnv } from '@psycron/context/runtime/RuntimeEnvContext';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { GoogleOAuthButton } from '@psycron/features/auth/google/GoogleOAuthButton';

import { AuthPageWrapper } from '../../auth/index.styles';
import { SIGNIN } from '../../urls';

export const TestHomePage = () => {
	const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();
	const navigate = useNavigate();

	const { isTestingEnv } = useRuntimeEnv();

	const methods = useForm({
		mode: 'onSubmit',
		shouldUnregister: true,
	});

	const { isSignInMutationLoading } = useAuth();

	useEffect((): void => {
		capture('backoffice test home viewed', {
			locale: locale ?? 'unknown',
			is_testing_env: isTestingEnv,
		});
	}, [locale, isTestingEnv]);

	useEffect((): void => {
		if (!isTestingEnv) {
			capture('backoffice test home redirected', {
				reason: 'not_testing_env',
			});
			navigate(SIGNIN);
		}
	}, [isTestingEnv, navigate]);

	return (
		<AuthPageWrapper>
			<SignLayout title={t('components.form.signin.title')}>
				<FormProvider {...methods}>
					<GoogleOAuthButton
						locale={locale}
						intent='signin'
						disabled={isSignInMutationLoading}
						audience={'worker'}
					/>
				</FormProvider>
			</SignLayout>
		</AuthPageWrapper>
	);
};
