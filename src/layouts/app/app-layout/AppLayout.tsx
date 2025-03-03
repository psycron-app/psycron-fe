import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import { Navbar } from '@psycron/components/navbar/Navbar';
import { UserDetailsCard } from '@psycron/components/user/components/user-details-card/UserDetailsCard';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useAuthSession } from '@psycron/hooks/useAuthSession';
import useViewport from '@psycron/hooks/useViewport';

import {
	Content,
	DividerWrapper,
	LayoutWrapper,
	NavBarWrapper,
} from './AppLayout.styles';

export const AppLayout: FC = () => {
	const { isMobile, isTablet } = useViewport();

	const sessionStatus = useAuthSession();

	const { isUserDetailsVisible, userDetails } = useUserDetails();

	const mockUserDetailsCardProps = {
		plan: {
			name: 'Premium',
			status: 'paid',
		},
	};

	if (sessionStatus) return sessionStatus;

	return (
		<LayoutWrapper>
			<NavBarWrapper>
				<Box>
					<Navbar />
				</Box>
				<DividerWrapper>
					<Divider
						orientation={isMobile || isTablet ? 'horizontal' : 'vertical'}
					/>
				</DividerWrapper>
			</NavBarWrapper>
			<Content>
				<Outlet />
				{isUserDetailsVisible && (
					<UserDetailsCard
						user={userDetails}
						plan={mockUserDetailsCardProps.plan}
					/>
				)}
			</Content>
		</LayoutWrapper>
	);
};
