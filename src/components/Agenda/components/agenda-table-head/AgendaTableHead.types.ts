import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaTableHeadProps {
	daySelectedFromCalendar: Date;
	fullWeekAvailability: {
		_id: string;
		date: string;
		slots: ISlot[];
		weekDay: string;
	}[];
}
