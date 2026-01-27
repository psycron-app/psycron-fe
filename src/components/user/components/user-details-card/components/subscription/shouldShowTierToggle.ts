export const shouldShowTierToggle = (): boolean => {
	const value = import.meta.env.VITE_FEATURE_SUBSCRIPTION_TIER_TOGGLE as
		| string
		| undefined;

	return value === 'true';
};
