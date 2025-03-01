import type { ReactNode } from 'react';
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
}

export interface IPatient extends IBaseUser {
	createdBy?: ITherapist | string;
	receivedNotifications?: INotification[];
	role: 'PATIENT';
	sessionDates: ISessionDatesGroup[];
}

export interface ISessionDatesGroup {
	_id?: string;
	sessions: ISessionDate[];
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
	body: string;
	dateUpdated: Date;
	from: string;
	method: string;
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
	endTime: string;
	note?: string;
	startTime: string;
	status: ISlotStatus;
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
	slot?: ISlot;
	slots?: ISlot[];
}

export interface IBookSessionWithLink {
	availabilityId: string;
	patient: Partial<IPatient>;
	selectedSlot: Date;
	shouldReplicate?: boolean;
	timeZone: string;
}
