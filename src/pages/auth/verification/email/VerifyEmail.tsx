import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { SIGNIN } from '@psycron/pages/urls';

const REDIRECT_DELAY_MS = 1200;

export const VerifyEmail = () => {
	const { i18n, t } = useTranslation();
	const { showAlert } = useAlert();
	const { verifyEmailToken, isVerifyEmailLoading } = useAuth();

	const [params] = useSearchParams();
	const navigate = useNavigate();

	const token = params.get('token') ?? '';

	useEffect(() => {
		const run = async () => {
			if (!token) {
				showAlert({
					severity: 'error',
					message: t('verifyEmail.missingToken', 'Missing token.'),
				});
				return;
			}

			try {
				const res = await verifyEmailToken(token);
				showAlert({ severity: 'success', message: res.message });

				window.setTimeout(() => {
					navigate(`/${i18n.resolvedLanguage}/${SIGNIN}`, { replace: true });
				}, REDIRECT_DELAY_MS);
			} catch {
				showAlert({
					severity: 'error',
					message: t(
						'verifyEmail.invalidOrExpired',
						'Invalid or expired link.'
					),
				});
			}
		};

		void run();
	}, [i18n.resolvedLanguage, navigate, showAlert, t, token, verifyEmailToken]);

	return (
		<div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
			<h1>{t('verifyEmail.title', 'Verify your email')}</h1>
			{isVerifyEmailLoading ? (
				<p>{t('verifyEmail.loading', 'Verifying…')}</p>
			) : (
				<p>
					{t('verifyEmail.help', 'You can close this page after verification.')}
				</p>
			)}
		</div>
	);
};
