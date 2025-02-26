import type { IAvailabilityResponse } from '@psycron/api/user/index.types';

import type { IAgendaClick } from '../../Agenda.types';

export interface IAgendaGrid {
	availability: IAvailabilityResponse;
	clickedSlot: string;
	currentWeekStart: Date;
	isBig: boolean;
	isFirstAppointment: boolean;
	isTherapist: boolean;
	onSlotClick: (props: IAgendaClick) => void;
	selectedDay: Date;
}
