import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { setTokens } from '@psycron/context/user/auth/utils/tokenStorage';
import i18n from '@psycron/i18n';
import { DASHBOARD, EDITUSERBYSESSION, SIGNIN } from '@psycron/pages/urls';

type RouteParams = {
	locale?: string;
};

const getSafeLocale = (value?: string): string => {
	// Keep this aligned with your supported locales
	const supported = new Set(['en', 'pt', 'et']);
	if (value && supported.has(value)) return value;

	const fromI18n = i18n.resolvedLanguage ?? i18n.language;
	if (fromI18n && supported.has(fromI18n)) return fromI18n;

	return 'en';
};

export const AuthCallback: React.FC = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { locale: localeFromRoute } = useParams<RouteParams>();

	useEffect(() => {
		const token = params.get('token');
		const refreshToken = params.get('refreshToken');
		const error = params.get('error');

		// Optional query params (nice for future-proofing)
		const stayConnected = params.get('stayConnected'); // 'true' | 'false' | null
		const intent = params.get('intent'); // 'login' | 'signup' | null
		const isNewUser = params.get('isNewUser') === 'true';

		const locale = getSafeLocale(localeFromRoute);

		if (error) {
			navigate(`/${locale}/${SIGNIN}?error=${encodeURIComponent(error)}`, {
				replace: true,
			});
			return;
		}

		if (!token || !refreshToken) {
			navigate(`/${locale}/${SIGNIN}?error=missing_tokens`, { replace: true });
			return;
		}

		// Decide persistence:
		// - if BE sends stayConnected, use it
		// - otherwise default to "true" (least surprising for OAuth)
		const persist = stayConnected === null ? true : stayConnected === 'true';

		setTokens({
			accessToken: token,
			refreshToken,
			persist,
		});

		// If you later implement onboarding for new users:
		if (intent === 'signup' && isNewUser) {
			navigate(`/${locale}/${EDITUSERBYSESSION}`, { replace: true });
			return;
		}

		navigate(`/${locale}/${DASHBOARD}`, { replace: true });
	}, [navigate, params, localeFromRoute]);

	return null;
};
