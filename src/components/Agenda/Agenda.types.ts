import type { IAvailabilityResponse } from '@psycron/api/user/index.types';

export interface IAgenda {
	availability?: IAvailabilityResponse;
	isLoading: boolean;
	selectedDay: Date;
}

export type StyledAgendaStatusProps =
	| 'available'
	| 'booked'
	| 'beforeToday'
	| 'selected'
	| 'clicked'
	| 'default';
