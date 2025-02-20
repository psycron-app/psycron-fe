import type { ReactNode } from 'react';

import type { CardActionsProps } from '../card/CardActions/CardActions.types';
import type { CardTitleProps } from '../card/CardTitle/CardTitle.types';

export interface IModal {
	cardActionsProps: CardActionsProps;
	cardTitleProps?: CardTitleProps;
	children: ReactNode;
	isLoading?: boolean;
	openModal: boolean;
	title?: string;
}
