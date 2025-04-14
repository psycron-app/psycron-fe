import { Text } from '@psycron/components/text/Text';

import {
	SkeletonBox,
	StyledSkeleton,
	StyledSkeletonWrapper,
	TextWrapper,
} from './Skeleton.styles';
import type { ISkeleton } from './Skeleton.types';

export const Skeleton = ({ text, children, onClick }: ISkeleton) => {
	return (
		<StyledSkeletonWrapper
			onClick={() => onClick?.()}
			hasOnClick={onClick ? true : false}
		>
			<TextWrapper>
				<Text fontWeight={600} width={'50%'}>
					{text}
				</Text>
			</TextWrapper>
			<SkeletonBox>
				<StyledSkeleton>{children}</StyledSkeleton>
			</SkeletonBox>
		</StyledSkeletonWrapper>
	);
};
