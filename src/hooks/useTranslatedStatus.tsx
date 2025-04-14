import { useTranslation } from 'react-i18next';
import { StatusEnum } from '@psycron/api/user/availability/index.types';

export const useTranslatedStatus = (excludedStatuses: string[] = []) => {
	const { t } = useTranslation();

	const statuses = Object.values(StatusEnum)
		.filter((status) => !excludedStatuses.includes(status))
		.map((status) => ({
			value: t(
				`page.availability.agenda.status.${status.toLowerCase() === 'empty' ? 'unavailable' : status.toLowerCase()}`
			),
			name: status,
		}));

	return statuses;
};
