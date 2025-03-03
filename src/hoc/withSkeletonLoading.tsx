import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@psycron/components/skeleton/Skeleton';
import type { ISkeleton } from '@psycron/components/skeleton/Skeleton.types';

interface WithSkeletonProps {
	isLoading: boolean;
	skeletonProps?: ISkeleton;
}

/**
 * HOC que exibe um Skeleton enquanto o conteúdo carrega
 */
export function withSkeletonLoading<T extends object>(
	WrappedComponent: ComponentType<T>
) {
	const SkeletonComponent = ({
		isLoading,
		skeletonProps,
		...props
	}: T & WithSkeletonProps) => {
		const [showSkeleton, setShowSkeleton] = useState(true);

		useEffect(() => {
			if (!isLoading) {
				const timer = setTimeout(() => setShowSkeleton(false), 500);
				return () => clearTimeout(timer);
			}
		}, [isLoading]);

		if (isLoading || showSkeleton) {
			return (
				<Skeleton {...skeletonProps}>
					<WrappedComponent {...(props as T)} />
				</Skeleton>
			);
		}

		return <WrappedComponent {...(props as T)} />;
	};

	SkeletonComponent.displayName = `withSkeletonLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return SkeletonComponent;
}
