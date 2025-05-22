import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Loader } from '@psycron/components/loader/Loader';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { SIGNIN } from '@psycron/pages/urls';

export const useAuthSession = () => {
	const { isSessionLoading, isAuthenticated } = useAuth();
	const { isUserDetailsLoading } = useUserDetails();
	const location = useLocation();
	const { locale } = useParams();

	const isLoading = isSessionLoading || isUserDetailsLoading;

	if (isLoading) return <Loader />;

	if (!isAuthenticated) {
		return <Navigate to={SIGNIN} replace state={{ from: location }} />;
	}

	if (location.pathname === `/${locale}`) {
		return <Navigate to={`/${locale}/dashboard`} replace />;
	}
	return null;
};
