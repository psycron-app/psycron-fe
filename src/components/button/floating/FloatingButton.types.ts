import { type ReactNode } from 'react';

export interface IFloatingButton {
	children: ReactNode;
	content: ReactNode;
	handleClick: () => void;
	handleOutsideClick: () => void;
	isVisible: boolean;
}
