import { useParams } from 'react-router-dom';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';

export const useTherapistId = () => {
	const { userId } = useParams<{ userId?: string }>();
	const { therapistId: contextId } = useUserDetails(userId);
	return contextId ?? userId;
};
