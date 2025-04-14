import type { ReactElement, ReactNode } from 'react';

export interface IMenuItem {
	closeMenu?: () => void;
	component?: ReactNode;
	disabled?: boolean;
	icon: ReactElement;
	isFooterIcon?: boolean;
	isFullList?: boolean;
	name: string;
	onClick?: () => void;
	open?: boolean;
	path?: string;
}
