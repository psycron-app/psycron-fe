import type { ITherapist } from '@psycron/context/user/auth/UserAuthenticationContext.types';

const MOCK_USER_DETAILS_KEY = '_psy_mock_user_details_v1';

export const getMockUserDetails = (): ITherapist | null => {
	try {
		const raw = localStorage.getItem(MOCK_USER_DETAILS_KEY);
		if (!raw) return null;

		const parsed = JSON.parse(raw) as unknown;
		if (!parsed || typeof parsed !== 'object') return null;

		return parsed as ITherapist;
	} catch {
		return null;
	}
};

export const setMockUserDetails = (user: ITherapist): void => {
	localStorage.setItem(MOCK_USER_DETAILS_KEY, JSON.stringify(user));
};

export const clearMockUserDetails = (): void => {
	localStorage.removeItem(MOCK_USER_DETAILS_KEY);
};
