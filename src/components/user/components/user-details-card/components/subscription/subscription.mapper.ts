import type { ITherapist } from '@psycron/context/user/details/UserDetailsContext.types';

export const mapUserToSubscriptionUIModel = (
	user: ITherapist
): { hasStripeCustomer: boolean; kind: 'empty' } => {
	return {
		kind: 'empty',
		hasStripeCustomer: Boolean(user.stripeCustomerID),
	};
};
