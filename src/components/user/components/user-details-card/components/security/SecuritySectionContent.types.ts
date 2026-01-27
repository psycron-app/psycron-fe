import type { AuthProvider } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export type SecuritySectionContentProps = {
	authProvider: AuthProvider;
	onChangePassword?: () => void;
};
