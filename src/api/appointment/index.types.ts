export interface ICancelAppointment {
	data: ICancelAppointmentData;
	therapistId: string;
}

export interface ICancelAppointmentData {
	appointments: {
		customReason: string;
		reasonCode: number;
		slotId: string;
	}[];
	patientId: string;
}

export interface ICancelEditAppointmentResponse {
	canceledSlots: string[];
	message: string;
}

export interface IEditAppointment {
	availabilityDayId: string;
	newSlotId: string;
	oldSlotId: string;
	patientId: string;
	therapistId: string;
}
export interface IPatientEditAppointmentResponse {
	endTime: string;
	message: string;
	newDate: string;
	newSlotId: string;
	oldSlotId: string;
	patientId: string;
	startTime: string;
	therapistId: string;
}
