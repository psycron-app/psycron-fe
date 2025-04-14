import { useTranslation } from 'react-i18next';
import { CancellationReasonEnum } from '@psycron/api/user/availability/index.types';
export const useCancellationReasons = () => {
	const { t } = useTranslation();

	const reasons: { label: string; value: string }[] = Object.values(
		CancellationReasonEnum
	)
		.filter((v) => typeof v === 'number')
		.map((value) => ({
			value: value.toString(),
			label: t(`globals.cancellation-reason.${value}`),
		}));

	return reasons;
};
