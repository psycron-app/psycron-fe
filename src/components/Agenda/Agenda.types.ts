import type { IAvailabilityResponse } from '@psycron/api/user/index.types';
import type { Locale } from 'date-fns';

export interface IAgenda {
	availability?: IAvailabilityResponse;
	dateLocale: Locale;
	isLoading: boolean;
	selectedDay: Date;
}
