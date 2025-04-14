import { useRef } from 'react';
import useClickOutside from '@psycron/hooks/useClickoutside';

import { ContentWrapper, FloatingButtonWrapper } from './FloatingButton.styles';
import type { IFloatingButton } from './FloatingButton.types';

export const FloatingButton = ({
	children,
	content,
	isVisible,
	handleClick,
	handleOutsideClick,
}: IFloatingButton) => {
	const floatingButtonRef = useRef();

	useClickOutside(floatingButtonRef, handleOutsideClick);

	return (
		<FloatingButtonWrapper
			isVisible={isVisible}
			onClick={handleClick}
			ref={floatingButtonRef}
		>
			{children}
			<ContentWrapper
				onMouseEnter={(e) => e.stopPropagation()}
				onClick={(e) => e.stopPropagation()}
				isVisible={isVisible}
			>
				{content}
			</ContentWrapper>
		</FloatingButtonWrapper>
	);
};
