export interface ICancelAppointment {
	data: ICancelAppointmentData;
	sessionDateId: string;
	therapistId: string;
}

export interface ICancelAppointmentData {
	date: Date;
	sessionId: string;
	slotId: string;
	startTime: string;
}

export interface ICancelEditAppointmentResponse {
	message: string;
}

export interface IEditAppointment {
	newData: {
		newDate: Date;
		newSessionSlotId: string;
		newStartTime: string;
	};
	oldSessionSlotId: string;
	therapistId: string;
}
