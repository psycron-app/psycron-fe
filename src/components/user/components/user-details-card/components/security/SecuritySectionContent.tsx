import { useTranslation } from 'react-i18next';
import { Button } from '@psycron/components/button/Button';
import { Password } from '@psycron/components/icons';

import { UserDetailsRow } from '../account/components/UserDetailsRow';

import {
	ManagedByProviderCallout,
	ManagedByProviderText,
	PasswordDots,
	SecurityRowsContainer,
} from './SecuritySectionContent.styles';
import type { SecuritySectionContentProps } from './SecuritySectionContent.types';

export const SecuritySectionContent = ({
	authProvider,
	onChangePassword,
}: SecuritySectionContentProps) => {
	const { t } = useTranslation();

	if (authProvider === 'google') {
		return (
			<SecurityRowsContainer>
				<UserDetailsRow
					label={t('globals.password')}
					value={<PasswordDots>••••••••</PasswordDots>}
				/>

				<ManagedByProviderCallout>
					<Password />
					<ManagedByProviderText>
						{t('components.user-details.section.security.google-mgmt')}
					</ManagedByProviderText>
				</ManagedByProviderCallout>
			</SecurityRowsContainer>
		);
	}

	return (
		<SecurityRowsContainer>
			<UserDetailsRow
				label={t('globals.password')}
				value={<PasswordDots>••••••••</PasswordDots>}
				right={
					onChangePassword ? (
						<Button
							type='button'
							onClick={onChangePassword}
							small
							variant='outlined'
							tertiary
						>
							{t('components.user-details.change', {
								name: t('globals.password'),
							})}
						</Button>
					) : null
				}
			/>
		</SecurityRowsContainer>
	);
};
