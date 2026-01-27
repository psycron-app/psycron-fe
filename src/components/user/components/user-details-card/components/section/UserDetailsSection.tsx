import {
	UserDetailsSectionActions,
	UserDetailsSectionBody,
	UserDetailsSectionContainer,
	UserDetailsSectionHeader,
	UserDetailsSectionIcon,
	UserDetailsSectionTitle,
} from './UserDetailsSection.styles';
import type { UserDetailsSectionProps } from './UserDetailsSection.types';

export const UserDetailsSection = ({
	icon,
	title,
	children,
	actions,
	'data-testid': dataTestId,
}: UserDetailsSectionProps) => {
	return (
		<UserDetailsSectionContainer data-testid={dataTestId}>
			<UserDetailsSectionHeader>
				<UserDetailsSectionIcon>{icon}</UserDetailsSectionIcon>

				<UserDetailsSectionTitle>{title}</UserDetailsSectionTitle>

				{actions ? (
					<UserDetailsSectionActions>{actions}</UserDetailsSectionActions>
				) : null}
			</UserDetailsSectionHeader>

			<UserDetailsSectionBody>{children}</UserDetailsSectionBody>
		</UserDetailsSectionContainer>
	);
};
