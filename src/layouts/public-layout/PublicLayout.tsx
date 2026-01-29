import { Outlet } from 'react-router-dom';
import { Header } from '@psycron/components/header/Header';

import {
	PublicLayoutContent,
	PublicLayoutWrapper,
} from './PublicLayout.styles';

export const PublicLayout = () => {
	return (
		<>
			<PublicLayoutWrapper>
				<Header />
				<PublicLayoutContent>
					<Outlet />
				</PublicLayoutContent>
			</PublicLayoutWrapper>
		</>
	);
};
