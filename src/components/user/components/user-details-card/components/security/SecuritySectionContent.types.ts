import type {
	AuthProvider,
	IConsent,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';

export type SecuritySectionContentProps = {
	authProvider: AuthProvider;
	consent?: {
		links?: SecurityConsentLinks;
		userConsent: IConsent;
	};
	onChangePassword?: () => void;
	userId: string;
};
export type SecurityConsentLinks = {
	privacy: string;
	terms: string;
};
