import type { SubscriptionStatus } from '@psycron/context/user/details/UserDetailsContext.types';

export type SubscriptionUIModel =
	| {
			hasStripeCustomer: boolean;
			kind: 'empty';
	  }
	| {
			kind: 'subscribed';
			planName: string;
			renewsAt?: string | null;
			status: SubscriptionStatus;
	  };

export type SubscriptionSectionContentProps = {
	model: SubscriptionUIModel;
	onManage: () => void;
};

export type Tier = 'tester' | 'paid';

export type PillTone = 'success' | 'neutral';
