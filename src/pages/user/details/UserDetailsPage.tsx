import { UserDetails } from '@psycron/components/user/components/user-details/UserDetails';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';

export const UserDetailsPage = () => {
	const { userDetails } = useUserDetails();

	const mockUserDetailsCardProps = {
		plan: {
			name: 'Premium',
			status: 'paid',
		},
	};

	return (
		<div>
			<UserDetails user={userDetails} plan={mockUserDetailsCardProps.plan} />
		</div>
	);
};
