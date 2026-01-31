import type { ReactNode } from 'react';

export interface IMenuItem {
	closeMenu?: () => void;
	component?: ReactNode;
	disabled?: boolean;
	hoverIcon?: ReactNode;
	icon: ReactNode;
	isFooterIcon?: boolean;
	isFullList?: boolean;
	name: string;
	onClick?: () => void;
	path?: string;
}
