import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import { Avatar } from '@psycron/components/avatar/Avatar';
import { Button } from '@psycron/components/button/Button';
import { Divider } from '@psycron/components/divider/Divider';
import { LockKeyhole, Logout, TestOff } from '@psycron/components/icons';
import { Link } from '@psycron/components/link/Link';
import { Loader } from '@psycron/components/loader/Loader';
import { Navbar } from '@psycron/components/navbar/Navbar';
import { Text } from '@psycron/components/text/Text';
import { useWorker } from '@psycron/context/worker/WorkerProvider';
import useViewport from '@psycron/hooks/useViewport';
import { BACKOFFICE, SIGNIN } from '@psycron/pages/urls';
import {
	BellRing,
	Bot,
	CalendarSearch,
	Flag,
	ScrollText,
	TestTubeDiagonal,
	UserRoundCog,
	Users,
} from 'lucide-react';

import {
	BackOfficeErrorWrapper,
	BackofficeFooter,
	BackofficeFooterEmail,
	BackOfficeNoWorkerError,
	Content,
	DividerWrapper,
	LayoutWrapper,
	NavBarWrapper,
} from './BackofficeLayout.styles';

export const BackofficeLayout: FC = () => {
	const { t } = useTranslation();

	const { isMobile, isTablet } = useViewport();

	const { worker, isLoading, logout, isAuthenticated, error } = useWorker();

	if (isLoading) {
		return <Loader />;
	}

	if (!isAuthenticated) {
		return (
			<LayoutWrapper>
				<BackOfficeErrorWrapper>
					<img src='/images/img-error.png' />
					<Text>You are not signed in</Text>
					<Link
						to={`${SIGNIN}`}
						onClick={() => {
							capture('Worker failed to load at backoffice');
						}}
					>
						Go to sign in
					</Link>
				</BackOfficeErrorWrapper>
			</LayoutWrapper>
		);
	}

	if (!worker) {
		return (
			<LayoutWrapper>
				<BackOfficeErrorWrapper>
					<img src='/images/enjoy.png' />
					<Text>{error ?? 'Failed to load session.'}</Text>
					<BackOfficeNoWorkerError>
						<Link
							to={`${SIGNIN}`}
							onClick={() => {
								capture('Worker failed to load at backoffice');
							}}
						>
							Sign in again
						</Link>
						<Button type='button' onClick={logout}>
							clear session
						</Button>
					</BackOfficeNoWorkerError>
				</BackOfficeErrorWrapper>
			</LayoutWrapper>
		);
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
			hoverIcon: <TestTubeDiagonal />,
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
