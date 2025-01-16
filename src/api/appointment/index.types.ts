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

export interface ICancelAppointmentResponse {
	message: string;
}
