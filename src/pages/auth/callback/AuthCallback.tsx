import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { setTokens } from '@psycron/context/user/auth/utils/tokenStorage';
import { AVAILABILITYGENERATE, DASHBOARD, SIGNIN } from '@psycron/pages/urls';

import { getSafeLocale } from './utils/getSafeLocale';
import type { RouteParams } from './AuthCallback.types';

export const AuthCallback: React.FC = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const { locale: localeFromRoute } = useParams<RouteParams>();

	useEffect(() => {
		const token = params.get('token');
		const refreshToken = params.get('refreshToken');
		const error = params.get('error');

		const stayConnected = params.get('stayConnected');
		const intent = params.get('intent');
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

		const persist = stayConnected === null ? true : stayConnected === 'true';

		setTokens({
			accessToken: token,
			refreshToken,
			persist,
		});

		if (intent === 'signup' && isNewUser) {
			navigate(`/${locale}/${AVAILABILITYGENERATE}`, { replace: true });
			return;
		}

		navigate(`/${locale}/${DASHBOARD}`, { replace: true });
	}, [navigate, params, localeFromRoute]);

	return null;
};
