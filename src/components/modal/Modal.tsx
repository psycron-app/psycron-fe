import { Card } from '../card/Card';

import { StyledContentWrapper, StyledModal } from './Modal.styles';
import type { IModal } from './Modal.types';

export const Modal = ({
	openModal,
	title,
	children,
	cardActionsProps,
}: IModal) => {
	return (
		<StyledModal open={openModal}>
			<StyledContentWrapper>
				<Card
					cardActionsProps={cardActionsProps}
					cardTitleProps={{
						title: title,
					}}
					cardTitle={!!title?.length}
				>
					{children}
				</Card>
			</StyledContentWrapper>
		</StyledModal>
	);
};
