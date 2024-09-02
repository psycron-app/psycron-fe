import type { ReactNode } from 'react';

import type { CardActionsProps } from '../card/CardActions/CardActions.types';

export interface IModal {
	cardActionsProps: CardActionsProps;
	children: ReactNode;
	openModal: boolean;
	title?: string;
}
