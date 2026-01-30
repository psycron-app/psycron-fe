import { useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import useClickOutside from '@psycron/hooks/useClickoutside';
import useViewport from '@psycron/hooks/useViewport';

import { Menu as MenuIcon } from '../icons';
import { LogoColor } from '../icons/brand/LogoColor';

import { Menu } from './menu/Menu';
import {
	ColoredLogo,
	DesktopkMenuWrapper,
	FloatingMobileNavbar,
	MobileMenuWrapper,
	MobileNavbarFooter,
	MobileNavbarMenu,
	MobileNavbarWrapper,
	NavbarFooterIcons,
	NavbarWrapper,
} from './Navbar.styles';
import type { NavbarProps } from './Navbar.types';

export const Navbar = ({ items, footerItems }: NavbarProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { isMobile, isTablet } = useViewport();
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	useClickOutside(dropdownRef, () => setIsMenuOpen(false));

	const handleMenuClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
	};

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
							<MobileMenuWrapper>
								<Menu
									items={items}
									closeMenu={() => setIsMenuOpen(false)}
									isFullList
								/>
							</MobileMenuWrapper>
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
					<DesktopkMenuWrapper>
						<Menu items={items} />
					</DesktopkMenuWrapper>
					<NavbarFooterIcons>
						<Menu items={footerItems} isFooterIcon />
					</NavbarFooterIcons>
				</NavbarWrapper>
			)}
		</>
	);
};
