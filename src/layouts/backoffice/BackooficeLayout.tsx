import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Divider } from '@psycron/components/divider/Divider';
import { WorkerAuthProvider } from '@psycron/context/worker/auth/WorkerAuthProvider';
import useViewport from '@psycron/hooks/useViewport';
import { WorkerGuard } from '@psycron/routes/WorkerGuard';

import {
	Content,
	DividerWrapper,
	LayoutWrapper,
	NavBarWrapper,
} from './BackofficeLayout.styles';

export const BackofficeLayout: FC = () => {
	const { isMobile, isTablet } = useViewport();

	return (
		<WorkerAuthProvider>
			<WorkerGuard>
				<LayoutWrapper>
					<NavBarWrapper>
						<Box>{/* <Navbar /> */}</Box>
						<DividerWrapper>
							<Divider
								orientation={isMobile || isTablet ? 'horizontal' : 'vertical'}
							/>
						</DividerWrapper>
					</NavBarWrapper>
					<Content>
						<Outlet />
					</Content>
				</LayoutWrapper>
			</WorkerGuard>
		</WorkerAuthProvider>
	);
};
