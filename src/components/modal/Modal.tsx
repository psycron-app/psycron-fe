import { Card } from '../card/Card';
import { Loader } from '../loader/Loader';

import { StyledContentWrapper, StyledModal } from './Modal.styles';
import type { IModal } from './Modal.types';

export const Modal = ({
	openModal,
	title,
	children,
	cardActionsProps,
	isLoading,
	cardTitleProps,
	onClose,
}: IModal) => {
	return (
		<StyledModal open={openModal} onClose={onClose}>
			{isLoading ? (
				<Loader />
			) : (
				<StyledContentWrapper>
					<Card
						cardActionsProps={cardActionsProps}
						cardTitleProps={{
							title: title,
						}}
						onClose={onClose}
						cardTitle={!!title?.length}
						{...cardTitleProps}
					>
						{children}
					</Card>
				</StyledContentWrapper>
			)}
		</StyledModal>
	);
};
