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
	newData: {
		newDate: Date;
		newSessionSlotId: string;
	};
	oldSessionSlotId: string;
	patientId: string;
	therapistId: string;
}
