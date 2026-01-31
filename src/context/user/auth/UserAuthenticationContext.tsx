import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import {
	getSession,
	logoutFc,
	signInFc,
	signUpFc,
	verifyEmail,
} from '@psycron/api/auth';
import type { CustomError } from '@psycron/api/error';
import type { ISignInForm } from '@psycron/components/form/SignIn/SignIn.types';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUpEmail.types';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { DASHBOARD, HOMEPAGE } from '@psycron/pages/urls';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import posthog from 'posthog-js';

import {
	clearAuthTokens,
	getAccessToken,
	setTokens,
} from './utils/tokenStorage';
import type {
	AuthContextType,
	AuthProviderProps,
	ITherapist,
	IUserData,
} from './UserAuthenticationContext.types';

const toAuthErrorCode = (error: CustomError): string => {
	const msg = String(error.message ?? '').toLowerCase();

	if (msg.includes('not-found')) return 'not_found';
	if (msg.includes('not-allowed') || msg.includes('forbidden'))
		return 'not_allowed';
	if (msg.includes('invalid') || msg.includes('credentials'))
		return 'invalid_credentials';
	if (msg.includes('verify') || msg.includes('verification'))
		return 'email_not_verified';
	if (msg.includes('already') || msg.includes('exists'))
		return 'already_exists';
	if (msg.includes('network')) return 'network';
	return 'unknown';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type LocationState = { from?: { pathname?: string } };

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const { showAlert } = useAlert();

	const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(
		null
	);

	const accessToken = getAccessToken();
	const hasAccessToken = Boolean(accessToken);

	const {
		data: sessionData,
		isLoading: isSessionLoading,
		isSuccess: isSessionSuccess,
		isError: isSessionError,
		error: sessionError,
	} = useQuery<IUserData>({
		queryKey: ['session'],
		queryFn: getSession,
		enabled: hasAccessToken,
		retry: false,
	});

	const isAuthenticated = Boolean(sessionData?.isAuthenticated);
	const user: ITherapist | null = sessionData?.user ?? null;

	useEffect(() => {
		if (!hasAccessToken || !isSessionError) return;

		const err = sessionError as unknown;

		if (err && typeof err === 'object' && 'statusCode' in err) {
			const statusCode = (err as { statusCode: number }).statusCode;

			if (statusCode === 401 || statusCode === 403) {
				capture('auth session invalidated', {
					status_code: statusCode,
				});
				clearAuthTokens();
			}
		}
	}, [hasAccessToken, isSessionError, sessionError]);

	const handleAuthSuccess = useCallback(
		async (args: {
			accessToken: string;
			persist: boolean;
			redirectTo?: string;
			refreshToken: string;
		}) => {
			if (!args.accessToken || !args.refreshToken) {
				clearAuthTokens();
				throw new Error('Missing auth tokens');
			}

			setTokens({
				accessToken: args.accessToken,
				refreshToken: args.refreshToken,
				persist: args.persist,
			});

			await queryClient.invalidateQueries({ queryKey: ['session'] });

			navigate(args.redirectTo ?? DASHBOARD, { replace: true });
		},
		[navigate, queryClient]
	);

	const signInMutation = useMutation({
		mutationFn: signInFc,
		onSuccess: async (res, variables: ISignInForm) => {
			const persist = Boolean(variables.stayConnected);

			await handleAuthSuccess({
				accessToken: res.token,
				refreshToken: res.refreshToken,
				persist,
				redirectTo: redirectAfterAuth ?? DASHBOARD,
			});

			capture('auth sign in succeeded', {
				method: 'password',
				audience: 'therapist',
				stay_connected: persist,
			});

			setRedirectAfterAuth(null);
		},
		onError: (error: CustomError) => {
			capture('auth sign in failed', {
				method: 'password',
				audience: 'therapist',
				error_code: toAuthErrorCode(error),
			});
			showAlert({ severity: 'error', message: t(error.message) });
		},
	});

	const signUpMutation = useMutation({
		mutationFn: signUpFc,
		onSuccess: async (res, variables: ISignUpForm) => {
			const persist = Boolean(variables.stayConnected);

			await handleAuthSuccess({
				accessToken: res.token,
				refreshToken: res.refreshToken,
				persist,
				redirectTo: DASHBOARD,
			});

			capture('auth sign up succeeded', {
				method: 'email',
				audience: 'therapist',
				stay_connected: persist,
				marketing_emails_accepted: Boolean(
					variables.consent.marketingEmailsAccepted
				),
			});
		},
		onError: (error: CustomError) => {
			capture('auth sign up failed', {
				method: 'email',
				audience: 'therapist',
				error_code: toAuthErrorCode(error),
			});

			showAlert({ severity: 'error', message: t(error.message) });
		},
	});

	const verifyEmailMutation = useMutation({
		mutationFn: verifyEmail,
		onSuccess: () => {
			capture('auth verify email succeeded');
		},
		onError: (error: CustomError) => {
			capture('auth verify email failed', {
				error_code: toAuthErrorCode(error),
			});
			showAlert({ severity: 'error', message: t(error.message) });
		},
	});

	const verifyEmailToken = useCallback(
		async (token: string) => {
			return verifyEmailMutation.mutateAsync(token);
		},
		[verifyEmailMutation]
	);

	const logoutMutation = useMutation({
		mutationFn: logoutFc,
		onSuccess: async () => {
			capture('auth logout succeeded');
			posthog.reset();

			clearAuthTokens();
			await queryClient.removeQueries({ queryKey: ['session'] });
			navigate(HOMEPAGE, { replace: true });
		},
		onError: async () => {
			capture('auth logout failed');
			posthog.reset();

			clearAuthTokens();
			await queryClient.removeQueries({ queryKey: ['session'] });
			navigate(HOMEPAGE, { replace: true });
		},
	});

	const signIn = useCallback(
		(data: ISignInForm) => {
			const state = location.state as LocationState | null;
			const from = state?.from?.pathname;

			setRedirectAfterAuth(from ?? DASHBOARD);

			signInMutation.mutate(data);
		},
		[location.state, signInMutation]
	);

	const signUp = useCallback(
		(data: ISignUpForm) => {
			signUpMutation.mutate(data);
		},
		[signUpMutation]
	);

	const logout = useCallback(() => {
		logoutMutation.mutate();
	}, [logoutMutation]);

	const value = useMemo<AuthContextType>(
		() => ({
			signIn,
			signUp,
			logout,
			isAuthenticated,
			isSessionLoading,
			isSessionSuccess,
			user,
			isSignInMutationLoading: signInMutation.isPending,
			isSignUpMutationLoading: signUpMutation.isPending,
			verifyEmailToken,
			isVerifyEmailLoading: verifyEmailMutation.isPending,
		}),
		[
			signIn,
			signUp,
			logout,
			isAuthenticated,
			isSessionLoading,
			isSessionSuccess,
			user,
			signInMutation.isPending,
			signUpMutation.isPending,
			verifyEmailToken,
			verifyEmailMutation.isPending,
		]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};
