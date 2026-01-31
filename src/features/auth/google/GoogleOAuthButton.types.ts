export type GoogleOAuthIntent = 'signin' | 'signup';
export type OAuthAudience = 'therapist' | 'worker';

export type StartGoogleOAuthArgs = {
	audience: OAuthAudience;
	intent: GoogleOAuthIntent;
	locale?: string;
	stayConnected?: boolean;
};

export type GoogleOAuthButtonProps = {
	audience: OAuthAudience;
	disabled?: boolean;
	intent: GoogleOAuthIntent;
	locale?: string;
};
