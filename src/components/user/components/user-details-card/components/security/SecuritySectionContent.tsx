import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { capture } from '@psycron/analytics/posthog/events';
import { PostHogEvent } from '@psycron/analytics/posthog/types';
import { Button } from '@psycron/components/button/Button';
import { Password } from '@psycron/components/icons';
import { Link } from '@psycron/components/link/Link';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';

import { UserDetailsRow } from '../account/components/UserDetailsRow';

import {
	ConsentAcceptedInfo,
	ConsentBlock,
	ConsentInfo,
	ManagedByProviderCallout,
	ManagedByProviderText,
	PasswordDots,
	SecurityRowsContainer,
} from './SecuritySectionContent.styles';
import type { SecuritySectionContentProps } from './SecuritySectionContent.types';

export const SecuritySectionContent = ({
	authProvider,
	onChangePassword,
	consent,
	userId,
}: SecuritySectionContentProps) => {
	const { t } = useTranslation();

	const { links, userConsent } = consent;

	const { updateMarketingConsent } = useUserDetails(userId);

	const initialMarketingAccepted =
		userConsent.marketingEmailsAcceptedAt != null;
	const [marketingAccepted, setMarketingAccepted] = useState(
		initialMarketingAccepted
	);

	const handleChangePassword = (): void => {
		onChangePassword();
	};

	return (
		<SecurityRowsContainer>
			<UserDetailsRow
				label={t('globals.password')}
				value={<PasswordDots>••••••••</PasswordDots>}
				right={
					authProvider === 'local' && onChangePassword ? (
						<Button
							type='button'
							onClick={handleChangePassword}
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

			{authProvider === 'google' ? (
				<ManagedByProviderCallout>
					<Password />
					<ManagedByProviderText>
						{t('components.user-details.section.security.google-mgmt')}
					</ManagedByProviderText>
				</ManagedByProviderCallout>
			) : null}
			<UserDetailsRow
				label={t('components.user-details.section.security.marketing')}
				right={
					<Switch
						small
						checked={marketingAccepted}
						onChange={(_, next) => {
							setMarketingAccepted(next);
							updateMarketingConsent(next, () => {
								setMarketingAccepted(!next);
							});
						}}
					/>
				}
			/>

			<ConsentBlock>
				<ConsentAcceptedInfo>
					<Trans
						i18nKey='components.user-details.section.security.accepted'
						components={{
							privacyLink: (
								<Link
									to={links.privacy}
									onClick={() =>
										capture(PostHogEvent.SettingsLegalLinkClicked, {
											doc: 'privacy',
											surface: 'security section',
										})
									}
								/>
							),
							termsLink: (
								<Link
									to={links.terms}
									onClick={() =>
										capture(PostHogEvent.SettingsLegalLinkClicked, {
											doc: 'terms',
											surface: 'security section',
										})
									}
								/>
							),
						}}
					/>
					<ConsentInfo>
						{t('components.user-details.section.security.accepted-info')}
					</ConsentInfo>
				</ConsentAcceptedInfo>
			</ConsentBlock>
		</SecurityRowsContainer>
	);
};
