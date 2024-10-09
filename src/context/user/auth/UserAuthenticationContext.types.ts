import type { ReactNode } from 'react';
import type { ISignInForm } from '@psycron/components/form/SignIn/SignIn.types';
import type { ISignUpForm } from '@psycron/components/form/SignUp/SignUp.types';

export interface AuthContextType {
	isAuthenticated: boolean;
	isSessionLoading: boolean;
	isSessionSuccess: boolean;
	logout: () => void;
	signIn: (data: ISignInForm) => void;
	signInError: string | null;
	signUp: (data: ISignUpForm) => void;
	signUpError: string | null;
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
	createdBy?: ITherapist;
	receivedNotifications?: INotification[];
	role: 'PATIENT';
	sessionDates: ISessionDate[];
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
	endTime: string;
	note?: string;
	startTime: string;
	status: 'AVAILABLE' | 'BLOCKED' | 'BOOKED';
}

export interface ISessionDate {
	date: Date;
	slot: ISlot;
}

export interface IBookSessionWithLink {
	availabilityId: string;
	patient: Partial<IPatient>;
	selectedSlot: Date;
	timeZone: string;
}
