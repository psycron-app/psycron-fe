import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '@psycron/components/loader/Loader';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { SIGNIN } from '@psycron/pages/urls';

export const useAuthSession = () => {
	const { isSessionLoading, isSessionSuccess, isAuthenticated } = useAuth();
	const { isUserDetailsLoading } = useUserDetails();
	const location = useLocation();

	if (isSessionLoading || isUserDetailsLoading) return <Loader />;

	if (!isSessionSuccess && !isAuthenticated) {
		return <Navigate to={SIGNIN} replace state={{ from: location }} />;
	}

	return null;
};
