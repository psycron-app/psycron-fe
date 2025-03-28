import { CardContent, Divider } from '@mui/material';

import { CardActions } from './CardActions/CardActions';
import { CardTitle } from './CardTitle/CardTitle';
import { CardWrapper, Content } from './Card.styles';
import type { CardProps } from './Card.types';

export const Card = ({
	children,
	cardTitle,
	cardTitleProps,
	cardActionsProps,
	onClose,
}: CardProps) => {
	return (
		<CardWrapper>
			<CardContent>
				{cardTitle || onClose ? (
					<>
						<CardTitle {...cardTitleProps} onClose={onClose} />
						{cardTitle ? <Divider /> : null}
					</>
				) : null}
				<Content>{children}</Content>
				<CardActions {...cardActionsProps} type={cardActionsProps.type} />
			</CardContent>
		</CardWrapper>
	);
};
