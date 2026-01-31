import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import { Loader } from '@psycron/components/loader/Loader';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import i18n from '@psycron/i18n';

import { DASHBOARD } from '../urls';

import { SignInContainer } from './components/sign-in/SignInContainer';
import { SignUpContainer } from './components/sign-up/SignUpContainer';
import { AuthPageWrapper } from './index.styles';

export const AuthPage = () => {
	const { isSessionLoading, isAuthenticated } = useAuth();

	const { pathname, state } = useLocation();
	const from = state?.from?.pathname || `/${i18n.language}/${DASHBOARD}`;
	const isSignIn = pathname.includes('sign-in');

	useEffect((): void => {
		if (!isSignIn) return;
		capture('auth sign in viewed');
	}, [isSignIn]);

	if (isSessionLoading) return <Loader />;
	if (isAuthenticated) return <Navigate to={from} replace />;

	return (
		<AuthPageWrapper>
			{isSignIn ? <SignInContainer /> : <SignUpContainer />}
		</AuthPageWrapper>
	);
};
