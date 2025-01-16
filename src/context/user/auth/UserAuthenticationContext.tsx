import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, logoutFc, signInFc, signUpFc } from '@psycron/api/auth';
import type { CustomError } from '@psycron/api/error';
import type { ISignInForm } from '@psycron/components/form/SignIn/SignIn.types';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUp.types';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { DASHBOARD, HOMEPAGE } from '@psycron/pages/urls';
import { ID_TOKEN } from '@psycron/utils/tokens';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

import type {
	AuthContextType,
	AuthProviderProps,
	ITherapist,
	IUserData,
} from './UserAuthenticationContext.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const navigate = useNavigate();

	const { showAlert } = useAlert();

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const [user, setUser] = useState<ITherapist | null>(null);

	const isTokenValid = (token: string | null): boolean => {
		if (!token) return false;

		try {
			const decoded = jwtDecode<JwtPayload>(token);
			if (!decoded.exp) return false;

			return decoded.exp * 1000 > Date.now();
		} catch {
			return false;
		}
	};

	const authToken = localStorage.getItem(ID_TOKEN);
	const isTokenStillValid = isTokenValid(authToken);

	const {
		data: sessionData,
		isLoading: isSessionLoading,
		isSuccess: isSessionSuccess,
	} = useQuery<IUserData>({
		queryKey: ['session'],
		queryFn: getSession,
		enabled: isTokenStillValid,
		retry: false,
	});

	useEffect(() => {
		if (!authToken || !isTokenValid(authToken)) {
			setIsAuthenticated(false);
			setUser(null);
			return;
		}

		if (sessionData?.isAuthenticated) {
			setIsAuthenticated(true);
			setUser(sessionData.user);
		}
	}, [authToken, sessionData]);

	const signInMutation = useMutation({
		mutationFn: signInFc,
		onSuccess: (res) => {
			if (res.token) {
				localStorage.setItem(ID_TOKEN, res.token);
			}
			setIsAuthenticated(true);
			navigate(DASHBOARD);
		},
		onError: (error: CustomError) => {
			showAlert({
				severity: 'error',
				message: error.message,
			});
		},
	});

	const signUpMutation = useMutation({
		mutationFn: signUpFc,
		onSuccess: (res) => {
			if (res.token) {
				localStorage.setItem(ID_TOKEN, res.token);
			}
			setIsAuthenticated(true);
			navigate(DASHBOARD);
		},
		onError: (error: CustomError) => {
			showAlert({
				severity: 'error',
				message: error.message,
			});
		},
	});

	const logoutMutation = useMutation({
		mutationFn: logoutFc,
		onSuccess: () => {
			setIsAuthenticated(false);
			setUser(null);
			navigate(HOMEPAGE);
		},
	});

	const signIn = (data: ISignInForm) => signInMutation.mutate(data);
	const signUp = (data: ISignUpForm) => signUpMutation.mutate(data);
	const logout = () => logoutMutation.mutate();

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signUp,
				logout,
				isAuthenticated,
				isSessionLoading,
				isSessionSuccess,
				user,
				isSignInMutationLoading: signInMutation.isPending,
				isSignUpMutationLoading: signUpMutation.isPending,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
