import type { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import type { AvailabilityFormData } from '@psycron/components/agenda/components/time-slots/TimeSlotRow.types';

export interface IAvailabilityForm {
	availabilityDays: boolean;
	duration?: boolean;
	introDecision?: boolean;
	selectedSlots: string[];
}

export interface IAvailabilityDaysForm {
	everyday: boolean;
	noWeekends: boolean;
	specificDays: boolean;
}

export interface IWeekDays {
	friday?: string;
	monday?: string;
	thursday?: string;
	tuesday?: string;
	wednesday?: string;
}

export interface IAvailabilityDays {
	register: UseFormRegister<IAvailabilityForm | IWeekDays>;
	watch: (field: string) => unknown;
}

export interface IAvailabilityIntroProps {
	register: UseFormRegister<IAvailabilityForm>;
}

export interface IAvailabilityDurationProps {
	register: UseFormRegister<IAvailabilityForm>;
}

export interface IAvailabilityHours {
	register: UseFormRegister<IAvailabilityForm>;
	setValue: UseFormSetValue<AvailabilityFormData>;
}
