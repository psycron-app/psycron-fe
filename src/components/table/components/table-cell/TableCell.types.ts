import type { ReactElement } from 'react';
import type { ISessionDate } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface ITableCellPropsBase {
	action?: boolean;
	icon?: boolean;
	id: string;
	isHead?: boolean;
	isLast?: boolean;
	isPatients?: boolean;
	label: string | JSX.Element;
	numeric?: boolean;
	onCellClick?: () => void;
	session?: ISessionDate;
}

export type ConditionalProps<T> = T extends { icon: true; isPatients: false }
	? {
			iconElements: ReactElement | ReactElement[];
			tooltip: string | string[];
		}
	: {
			iconElements?: ReactElement[];
			tooltip?: string[];
		};

export type ITableCellProps = ITableCellPropsBase &
	ConditionalProps<ITableCellPropsBase>;
