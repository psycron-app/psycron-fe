import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { setTokens } from '@psycron/context/user/auth/utils/tokenStorage';
import { setWorkerTokens } from '@psycron/context/worker/utils/workerTokenStorage';
import i18n from '@psycron/i18n';
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
		const returnTo = params.get('returnTo');
		const isWorkerFlow = returnTo?.startsWith('/backoffice') ?? false;

		const persist = stayConnected === null ? true : stayConnected === 'true';

		if (isWorkerFlow) {
			setWorkerTokens({
				accessToken: token,
				refreshToken,
				persist: true,
			});
		} else {
			setTokens({
				accessToken: token,
				refreshToken,
				persist,
			});
		}

		const isSafeReturnTo = (value: string): boolean => {
			if (!value.startsWith('/')) return false;
			if (value.startsWith('//')) return false;
			if (value.includes('://')) return false;
			return true;
		};

		if (returnTo && isSafeReturnTo(returnTo)) {
			navigate(`/${i18n.language}${returnTo}`, { replace: true });
			return;
		}
		if (intent === 'signup' && isNewUser) {
			navigate(`/${locale}/${AVAILABILITYGENERATE}`, { replace: true });
			return;
		}

		navigate(`/${locale}/${DASHBOARD}`, { replace: true });
	}, [navigate, params, localeFromRoute]);

	return null;
};
