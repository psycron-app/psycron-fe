import type { ReactNode } from 'react';
import type { StatusEnum } from '@psycron/api/user/availability/index.types';
import type { ISignInForm } from '@psycron/components/form/SignIn/SignIn.types';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUp.types';

export interface AuthContextType {
	isAuthenticated: boolean;
	isSessionLoading: boolean;
	isSessionSuccess: boolean;
	isSignInMutationLoading: boolean;
	isSignUpMutationLoading: boolean;
	logout: () => void;
	signIn: (data: ISignInForm) => void;
	signUp: (data: ISignUpForm) => void;
	user?: ITherapist;
}

export interface AuthProviderProps {
	children: ReactNode;
}

export interface IUserData {
	isAuthenticated: boolean;
	user?: ITherapist;
}

export interface IBaseUser {
	_id: string;
	address: IAddress;
	contacts: IContactInfo;
	createdAt?: Date;
	firstName: string;
	lastName: string;
	updatedAt?: Date;
}
export interface ITherapist extends IBaseUser {
	availability: IAvailability[];
	password: string;
	patients?: IPatient[];
	role: 'THERAPIST' | 'ADMIN';
	speciality?: string;
	stripeCustomerID?: string;
	subscriptions?: [];
	timeZone?: string;
}

export interface IPatient extends IBaseUser {
	cancelledAppointments?: ICancelledAppointment[];
	createdBy?: ITherapist | string;
	notifications?: INotification[];
	role: 'PATIENT';
	sessionDates: ISessionDatesGroup[];
	timeZone?: string;
}

export interface ISessionDatesGroup {
	_id?: string;
	date: string | Date;
	slots: ISlot[];
}

export interface IContactInfo {
	email: string;
	phone?: string;
	whatsapp?: string;
}

export interface IAddress {
	address?: string;
	administrativeArea?: string;
	city?: string;
	country?: string;
	moreInfo?: string;
	postalCode?: string;
	route?: string;
	streetNumber?: string;
	sublocality?: string;
}

export interface INotification {
	channel: string;
	content: string;
	icsContent: string;
	id: string;
	messageType: string;
	sentAt: Date;
}

export interface IAvailability {
	completed: boolean;
	consultationDuration: number;
	createAvailabilitySession: ISessionAvailability;
	date?: Date;
	slots: ISlot[];
	therapistId: string;
	weekday:
		| 'Monday'
		| 'Tuesday'
		| 'Wednesday'
		| 'Thursday'
		| 'Friday'
		| 'Saturday'
		| 'Sunday';
}

export interface ISessionAvailability {
	completed?: boolean;
	consultationDuration?: number;
	step?: number;
	unavailableHours?: {
		endTime: string;
		startTime: string;
	}[];
	weekdays?: string[];
}

export interface ISlot {
	_id: string;
	canceledAt?: string | null;
	customReason?: string | null;
	endTime: string;
	note?: string;
	patientId?: string;
	reasonCode?: string | null;
	startTime: string;
	status: StatusEnum;
}

export type ISlotStatus =
	| 'AVAILABLE'
	| 'BLOCKED'
	| 'BOOKED'
	| 'ONHOLD'
	| 'CANCELLED'
	| 'EMPTY';

export interface ISessionDate {
	_id: string;
	date: Date;
	slots?: ISlot[];
}

export interface IBookSessionWithLink {
	availabilityDayId: string;
	patient: Partial<IPatient>;
	shouldReplicate?: boolean;
	slotId: string;
	timeZone: string;
}

export interface ICancelledAppointment {
	cancelledAt: Date;
	customReason?: string;
	date: Date;
	endTime: string;
	reasonCode?: number;
	slotId: string;
	startTime: string;
	triggeredBy: 'PATIENT' | 'THERAPIST';
}
