import { Loader } from '@psycron/components/loader/Loader';

import {
	PageChildrenWrapper,
	PageLayoutWrapper,
	PageLoaderWrapper,
	PageTitle,
	PageTitleWrapper,
} from './PageLayout.styles';
import type { IPageLayout } from './PageLayout.types';

export const PageLayout = ({ title, children, isLoading }: IPageLayout) => {
	return (
		<PageLayoutWrapper>
			{title ? (
				<PageTitleWrapper>
					<PageTitle>{title}</PageTitle>
				</PageTitleWrapper>
			) : null}
			{isLoading ? (
				<PageLoaderWrapper>
					<Loader />
				</PageLoaderWrapper>
			) : (
				<PageChildrenWrapper>{children}</PageChildrenWrapper>
			)}
		</PageLayoutWrapper>
	);
};
