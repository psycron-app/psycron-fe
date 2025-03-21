import { Box } from '@mui/material';
import { NavigateLink } from '@psycron/components/link/navigate/NavigateLink';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

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
	backButton,
	backTo,
}: IPageLayout) => {
	return (
		<PageLayoutWrapper>
			{title ? (
				<PageTitleWrapper>
					<PageTitle>{title}</PageTitle>
					{subTitle ? (
						<Box pt={spacing.mediumSmall}>
							<Text fontSize='1rem'>{subTitle}</Text>
						</Box>
					) : null}
					{backButton ? <NavigateLink isBack to={backTo} /> : null}
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
