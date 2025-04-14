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
	dates: IAvailabilityDate[];
	firstDate: IDateInfo | null;
	isEmpty: boolean;
	lastDate: IDateInfo | null;
	totalPages: number;
}

export interface IDateInfo {
	date: Date;
	dateId?: string;
}

export interface DateInfoParams {
	cursor?: string;
	dateId: string;
}

export interface IAvailabilityDate {
	_id: string;
	date: Date;
	slots: ISlot[];
}

export interface IPaginatedAvailability {
	availabilityDates: IAvailabilityDate[];
	conflicts?: [];
	consultationDuration?: number;
	pagination: {
		hasNextPage: boolean;
		hasPrevPage: boolean;
		nextCursor: string | null;
		previousCursor: string | null;
		totalItems: number;
	};
	therapistId: string;
	timezone?: string;
}
