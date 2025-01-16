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
	isLoading,
}: CardProps) => {
	return (
		<CardWrapper>
			{!isLoading && (
				<CardContent>
					{cardTitle ? (
						<>
							<CardTitle {...cardTitleProps} />
							<Divider />
						</>
					) : null}
					<Content>{children}</Content>
					<CardActions {...cardActionsProps} type={cardActionsProps.type} />
				</CardContent>
			)}
		</CardWrapper>
	);
};
