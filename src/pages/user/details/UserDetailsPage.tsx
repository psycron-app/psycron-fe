import { UserDetailsCard } from '@psycron/components/user/components/user-details-card/UserDetailsCard';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';

export const UserDetailsPage = () => {
	const { userDetails } = useUserDetails();

	return (
		<>
			<UserDetailsCard user={userDetails} />
		</>
	);
};
