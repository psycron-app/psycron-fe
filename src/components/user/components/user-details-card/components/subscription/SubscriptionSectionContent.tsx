import { useTranslation } from 'react-i18next';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';

import {
	SubscriptionCard,
	SubscriptionEmptyState,
	SubscriptionHeader,
	SubscriptionMeta,
	SubscriptionPill,
} from './SubscriptionSectionContent.styles';
import type { SubscriptionSectionContentProps } from './SubscriptionSectionContent.types';

const formatDate = (iso?: string | null): string | null => {
	if (!iso) return null;
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return null;
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});
};

export const SubscriptionSectionContent = ({
	model,
	onManage,
}: SubscriptionSectionContentProps) => {
	const { t } = useTranslation();

	if (model.kind === 'empty') {
		return (
			<SubscriptionEmptyState>
				<Text variant='subtitle1' fontWeight={600}>
					{model.hasStripeCustomer
						? t(
								'components.user-details.subscription.empty.title.has-customer',
								'No active subscription'
							)
						: t(
								'components.user-details.subscription.empty.title.no-customer',
								'Billing not set up'
							)}
				</Text>

				<Text variant='body2'>
					{model.hasStripeCustomer
						? t(
								'components.user-details.subscription.empty.body.has-customer',
								'Your billing profile is ready. Subscription details will appear here once you subscribe.'
							)
						: t(
								'components.user-details.subscription.empty.body.no-customer',
								'Add a payment method to enable your subscription.'
							)}
				</Text>

				<Button type='button' tertiary variant='outlined' onClick={onManage}>
					{t(
						'components.user-details.subscription.cta.manage',
						'Manage subscription'
					)}
				</Button>
			</SubscriptionEmptyState>
		);
	}

	const renewsLabel = formatDate(model.renewsAt);

	return (
		<SubscriptionCard>
			<SubscriptionHeader>
				<Text variant='h6' fontWeight={700}>
					{model.planName}
				</Text>

				<SubscriptionMeta>
					<SubscriptionPill
						tone={model.status === 'active' ? 'success' : 'neutral'}
					>
						{model.status === 'active'
							? t('globals.active', 'Active')
							: model.status}
					</SubscriptionPill>

					{renewsLabel ? (
						<Text variant='body2'>
							{t('components.user-details.subscription.renews', 'Renews')}{' '}
							{renewsLabel}
						</Text>
					) : null}
				</SubscriptionMeta>
			</SubscriptionHeader>

			<Button
				type='button'
				tertiary
				variant='outlined'
				onClick={onManage}
				fullWidth
			>
				{t(
					'components.user-details.subscription.cta.manage',
					'Manage subscription'
				)}
			</Button>
		</SubscriptionCard>
	);
};
