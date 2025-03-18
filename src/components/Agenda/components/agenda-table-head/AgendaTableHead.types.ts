import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaTableHeadProps {
	fullWeekAvailability: {
		_id: string;
		date: string;
		slots: ISlot[];
		weekDay: string;
	}[];
}
