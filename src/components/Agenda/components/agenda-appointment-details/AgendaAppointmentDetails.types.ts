import type {
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';
import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import type { ISelectedSlot } from '../../Agenda.types';

export interface IAgendaAppointmentDetails {
	appointmentDetails: ISelectedSlot;
	getValues: UseFormGetValues<{
		status: ISlotStatus;
	}>;
	handleEditAppointment: (selectedSlot: ISelectedSlot) => void;
	isEditingStatus: boolean;
	register: UseFormRegister<{
		status: ISlotStatus;
	}>;
	setValue: UseFormSetValue<{
		status: ISlotStatus;
	}>;
}
