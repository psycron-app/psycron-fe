import type {
	ISlot,
	ITherapist,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface IUserByIdResponse {
	user: ITherapist;
}

export interface IEditUser {
	data: Partial<ITherapist>;
	userId: string;
}

export interface IPasswordChange {
	confirmPassword: string;
	newPassword: string;
	password: string;
}

export interface IChangePass {
	data: IPasswordChange;
	userId: string;
}

export interface IResponse {
	message: string;
	status: string;
}

export interface ITherapistById {
	therapistId: string;
}

export interface IAvailabilityResponse {
	latestAvailability: {
		_id: string;
		availabilityDates: IAvailabilityDate[];
		consultationDuration: number;
		createAvailabilitySession: string;
		createdAt: string;
		therapistId: string;
		updatedAt: string;
	};
}

export interface IAvailabilityDate {
	_id: string;
	date: string;
	slots: ISlot[];
}
