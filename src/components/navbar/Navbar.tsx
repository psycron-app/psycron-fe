import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import useClickOutside from '@psycron/hooks/useClickoutside';
import useViewport from '@psycron/hooks/useViewport';
import {
	APPOINTMENTS,
	DASHBOARD,
	EDITUSERPATH,
	LOGOUT,
	PATIENTS,
	PAYMENTS,
} from '@psycron/pages/urls';

import {
	Calendar,
	DashboardIcon,
	Help,
	Language,
	Logout,
	Menu as MenuIcon,
	PatientList,
	Payment,
	UserSettings,
} from '../icons';
import { LogoColor } from '../icons/brand/LogoColor';
import { Localization } from '../localization/Localization';

import { Menu } from './menu/Menu';
import {
	ColoredLogo,
	FloatingMobileNavbar,
	MobileNavbarFooter,
	MobileNavbarMenu,
	MobileNavbarWrapper,
	NavbarFooterIcons,
	NavbarWrapper,
} from './Navbar.styles';

export const Navbar = () => {
	const { t } = useTranslation();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isMobile, isTablet } = useViewport();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const [isAppointmentTipOpen, setIsAppointmentTipOpen] =
		useState<boolean>(true);

	const { toggleUserDetails, userDetails } = useUserDetails();

	const { isAvailabilityEmpty } = useAvailability();

	const { pathname } = useLocation();

	useClickOutside(dropdownRef, () => setIsMenuOpen(false));

	useEffect(() => {
		if (
			isAvailabilityEmpty &&
			!(pathname.includes('appointments') || pathname.includes('availability'))
		) {
			setIsAppointmentTipOpen(true);
		} else {
			setIsAppointmentTipOpen(false);
		}
	}, [isAvailabilityEmpty, pathname]);

	const handleMenuClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
	};

	const menuItems = [
		{
			name: t('components.navbar.dashboard'),
			icon: <DashboardIcon />,
			path: DASHBOARD,
		},
		{
			name: t('components.navbar.user-settings'),
			icon: <UserSettings />,
			path: `${EDITUSERPATH}/${userDetails?._id}`,
			onClick: () => toggleUserDetails(),
		},
		{
			name: t('globals.patients'),
			icon: <PatientList />,
			path: PATIENTS,
			disabled: true,
		},
		{
			name: t('globals.billing-manager'),
			icon: <Payment />,
			path: PAYMENTS,
			disabled: true,
		},
		{
			name: isAvailabilityEmpty
				? t('globals.appointments-manager')
				: t('globals.appointments'),
			icon: <Calendar />,
			path: APPOINTMENTS,
			open: isAppointmentTipOpen,
		},
	];

	const footerItems = [
		{
			name: t('globals.change-language'),
			icon: <Language />,
			component: <Localization />,
		},
		{ name: t('globals.help'), icon: <Help />, path: '/help-center' },
		{ name: t('globals.logout'), icon: <Logout />, path: LOGOUT },
	];

	return (
		<>
			{isMobile || isTablet ? (
				<>
					<MobileNavbarWrapper>
						<ColoredLogo>
							<LogoColor />
						</ColoredLogo>
						<MobileNavbarMenu>
							<IconButton onMouseDown={handleMenuClick}>
								<MenuIcon />
							</IconButton>
						</MobileNavbarMenu>
					</MobileNavbarWrapper>
					{isMenuOpen && (
						<FloatingMobileNavbar ref={dropdownRef}>
							<Box>
								<Menu
									items={menuItems}
									closeMenu={() => setIsMenuOpen(false)}
									isFullList
								/>
							</Box>
							<MobileNavbarFooter>
								<Menu
									items={footerItems}
									closeMenu={() => setIsMenuOpen(false)}
									isFooterIcon
									isFullList
								/>
							</MobileNavbarFooter>
						</FloatingMobileNavbar>
					)}
				</>
			) : (
				<NavbarWrapper>
					<ColoredLogo>
						<LogoColor />
					</ColoredLogo>
					<Box>
						<Menu items={menuItems} isFooterIcon />
					</Box>
					<NavbarFooterIcons>
						<Menu items={footerItems} />
					</NavbarFooterIcons>
				</NavbarWrapper>
			)}
		</>
	);
};
