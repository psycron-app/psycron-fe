import { useTranslation } from 'react-i18next';
import type { AuthProvider } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import { UserDetailsRow } from './components/UserDetailsRow';
import {
	AccountRowsContainer,
	UserDetailsPill,
	UserDetailsValueText,
} from './AccountSectionContent.styles';
import type { AccountSectionContentProps } from './AccountSectionContent.types';

const getAuthMethodLabel = (authMethod: AuthProvider): string => {
	switch (authMethod) {
		case 'google':
			return 'Google';
		case 'local':
			return 'Email & password';
	}
};

export const AccountSectionContent = ({
	name,
	email,
	authMethod,
	isEmailReadOnly = true,
	rightSlot,
}: AccountSectionContentProps) => {
	const { t } = useTranslation();
	return (
		<AccountRowsContainer>
			<UserDetailsRow
				label={t('globals.name')}
				value={<UserDetailsValueText>{name}</UserDetailsValueText>}
				right={rightSlot?.name}
			/>
			<UserDetailsRow
				label={t('globals.email')}
				value={<UserDetailsValueText>{email}</UserDetailsValueText>}
				right={
					rightSlot?.email ??
					(isEmailReadOnly ? (
						<UserDetailsPill tone='neutral'>
							{t('globals.read-only')}
						</UserDetailsPill>
					) : null)
				}
			/>
			<UserDetailsRow
				label={t('globals.auth-method')}
				right={
					rightSlot?.authMethod ?? (
						<UserDetailsPill tone='info'>
							{getAuthMethodLabel(authMethod)}
						</UserDetailsPill>
					)
				}
			/>
		</AccountRowsContainer>
	);
};
