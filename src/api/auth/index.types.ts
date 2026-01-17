export type RegisterRequestPayload = {
	consent: ConsentPayload;
	// Service expects this:
	contacts: { email: string };

	// Controller expects these:
	email: string;
	firstName: string;

	lastName: string;

	password: string;
	stayConnected?: boolean;

	timeZone?: string;
};

export type RegisterResponse = {
	message: string;
	refreshToken: string;
	status: 'success';
	token: string;
};

export type ConsentPayload = {
	dataProcessingAccepted?: boolean;
	marketingEmailsAccepted?: boolean;
	privacyPolicyAccepted: boolean;
	termsAccepted: boolean;
};

export type AuthSuccessResponse = {
	message: string;
	refreshToken: string;
	status: 'success';
	token: string;
};

export type SignUpLocalRequest = {
	authProvider?: 'local';
	consent: ConsentPayload;
	// Service/DTO-friendly (keep for future + internal consistency):
	contacts: { email: string };

	// Controller expects:
	email: string;
	firstName: string;

	lastName: string;

	password: string;
	stayConnected?: boolean;

	timeZone?: string;
};

export type SignUpGoogleRequest = {
	authProvider: 'google';
	// backend must validate this later
	// still required for GDPR
	consent: ConsentPayload;
	email?: string;

	// optional fallbacks
	firstName?: string;
	idToken: string;

	lastName?: string;
	stayConnected?: boolean;

	timeZone?: string;
};

export type SignUpRequest = SignUpLocalRequest | SignUpGoogleRequest;
