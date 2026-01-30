import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Avatar } from '@psycron/components/avatar/Avatar';
import { Divider } from '@psycron/components/divider/Divider';
import { LockKeyhole, Logout, TestOff } from '@psycron/components/icons';
import { Loader } from '@psycron/components/loader/Loader';
import { Navbar } from '@psycron/components/navbar/Navbar';
import { Text } from '@psycron/components/text/Text';
import { useWorker } from '@psycron/context/worker/WorkerProvider';
import useViewport from '@psycron/hooks/useViewport';
import { BACKOFFICE } from '@psycron/pages/urls';
import {
	BellRing,
	Bot,
	CalendarSearch,
	Flag,
	ScrollText,
	UserRoundCog,
	Users,
} from 'lucide-react';

import {
	BackofficeFooter,
	BackofficeFooterEmail,
	Content,
	DividerWrapper,
	LayoutWrapper,
	NavBarWrapper,
} from './BackofficeLayout.styles';

export const BackofficeLayout: FC = () => {
	const { t } = useTranslation();

	const { isMobile, isTablet } = useViewport();

	const { worker, isLoading, logout } = useWorker();

	if (isLoading) {
		return <Loader />;
	}
	const { firstName, lastName, email, picture } = worker;

	const backofficeMenuItems = [
		{
			name: `${firstName} ${lastName}`,
			icon: <Avatar src={picture} firstName={firstName} lastName={lastName} />,
		},
		{
			name: t('components.navbar.test'),
			icon: <TestOff />,
			path: BACKOFFICE,
		},
		{ name: 'Admin access', icon: <LockKeyhole />, disabled: true },
		{ name: 'Therapists', icon: <UserRoundCog />, disabled: true },
		{ name: 'Patients', icon: <Users />, disabled: true },
		{ name: 'Appointments', icon: <CalendarSearch />, disabled: true },
		{ name: 'Notifications', icon: <BellRing />, disabled: true },
		{ name: 'Júpiter monitoring', icon: <Bot />, disabled: true },
		{ name: 'Audit logs', icon: <ScrollText />, disabled: true },
		{ name: 'Feature flags', icon: <Flag />, disabled: true },
	];

	const backofficeFooterItems = [
		{ name: t('globals.logout'), icon: <Logout />, onClick: logout },
	];

	return (
		<LayoutWrapper>
			<NavBarWrapper>
				<Navbar
					items={backofficeMenuItems}
					footerItems={backofficeFooterItems}
				/>
				<DividerWrapper>
					<Divider
						orientation={isMobile || isTablet ? 'horizontal' : 'vertical'}
					/>
				</DividerWrapper>
			</NavBarWrapper>
			<Content>
				<Outlet />

				<BackofficeFooter>
					<Text>{'You are loggedin at your Psycron´s backoffice as'}</Text>
					<BackofficeFooterEmail> {email}</BackofficeFooterEmail>
				</BackofficeFooter>
			</Content>
		</LayoutWrapper>
	);
};
