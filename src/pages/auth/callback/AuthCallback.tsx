import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setTokens } from '@psycron/context/user/auth/utils/helpers';
import i18n from '@psycron/i18n';
import { DASHBOARD, SIGNIN } from '@psycron/pages/urls';

export const AuthCallback: React.FC = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();

	useEffect(() => {
		const token = params.get('token');
		const refreshToken = params.get('refreshToken');
		const error = params.get('error');

		if (error) {
			navigate(`/${SIGNIN}?error=${encodeURIComponent(error)}`, {
				replace: true,
			});
			return;
		}

		if (!token || !refreshToken) {
			navigate(`/${SIGNIN}?error=missing_tokens`, { replace: true });
			return;
		}

		// Persist tokens (your existing helper)
		setTokens(token, refreshToken);

		// Go to dashboard
		navigate(`/${i18n.language}/${DASHBOARD}`, { replace: true });
	}, [navigate, params]);

	return null; // or <Loader />
};
