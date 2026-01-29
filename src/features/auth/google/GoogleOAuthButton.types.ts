export type GoogleOAuthIntent = 'signin' | 'signup';

export type StartGoogleOAuthArgs = {
	intent: GoogleOAuthIntent;
	locale?: string;
	stayConnected?: boolean; // required
};

export type GoogleOAuthButtonProps = {
	disabled?: boolean;
	intent: GoogleOAuthIntent;
	locale?: string; // required
};
