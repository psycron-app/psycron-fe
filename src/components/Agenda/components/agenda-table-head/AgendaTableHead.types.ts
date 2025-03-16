import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IAgendaTableHeadProps {
	fullWeekAvailability: {
		_id: string;
		date: string;
		slots: ISlot[];
		weekDay: string;
	}[];
	nextCursor: string | undefined;
	previousCursor: string | undefined;
	previousRef: (node?: Element) => void;
	ref: (node?: Element) => void;
}
