import { Box } from '@mui/material';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';

import {
	PageChildrenWrapper,
	PageLayoutWrapper,
	PageLoaderWrapper,
	PageTitle,
	PageTitleWrapper,
} from './PageLayout.styles';
import type { IPageLayout } from './PageLayout.types';

export const PageLayout = ({
	title,
	children,
	isLoading,
	subTitle,
}: IPageLayout) => {
	return (
		<PageLayoutWrapper>
			{title ? (
				<PageTitleWrapper>
					<PageTitle>{title}</PageTitle>
					{subTitle ? (
						<Box>
							<Text fontSize='1.2rem'>{subTitle}</Text>
						</Box>
					) : null}
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
