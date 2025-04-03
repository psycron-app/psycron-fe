import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '@psycron/api/user';
import { getAvailabilitySession } from '@psycron/api/user/availability';
import { useSecureStorage } from '@psycron/hooks/useSecureStorage';
import { EDITUSERPATH } from '@psycron/pages/urls';
import { THERAPIST_ID } from '@psycron/utils/tokens';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../auth/UserAuthenticationContext';
import type {
	IAvailability,
	ITherapist,
} from '../auth/UserAuthenticationContext.types';

import type {
	UserDetailsContextType,
	UserDetailsProviderProps,
} from './UserDetailsContext.types';

export const UserDetailsContext = createContext<
	UserDetailsContextType | undefined
>(undefined);

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
	const [isUserDetailsVisible, setIsUserDetailsVisible] =
		useState<boolean>(false);

	const navigate = useNavigate();

	const { user } = useAuth();

	const toggleUserDetails = () => {
		setIsUserDetailsVisible((prev) => !prev);
	};

	const handleClickEditUser = (id: string) => {
		navigate(`${EDITUSERPATH}/${id}`);
		toggleUserDetails();
	};

	const handleClickEditSession = (userId: string, session: string) => {
		const editUserPath = `${EDITUSERPATH}/${userId}`;

		const specialPaths: { [hey: string]: string } = {
			password: `${editUserPath}/password`,
			subscription: '/subscription-manager',
			patients: '/patients-manager',
		};

		if (specialPaths[session]) {
			navigate(specialPaths[session]);
		} else {
			navigate(`${editUserPath}/${session}`);
		}

		toggleUserDetails();
	};

	return (
		<UserDetailsContext.Provider
			value={{
				isUserDetailsVisible,
				toggleUserDetails,
				handleClickEditUser,
				handleClickEditSession,
				user,
			}}
		>
			{children}
		</UserDetailsContext.Provider>
	);
};

export const useUserDetails = (passedUserId?: string) => {
	const context = useContext(UserDetailsContext);
	if (!context) {
		throw new Error('useUserDetails must be used within a UserDetailsProvider');
	}
	const { user } = context;

	const userId = passedUserId ?? user?._id;

	const {
		data: userDetails,
		isLoading: isUserDetailsLoading,
		isSuccess: isUserDetailsSucces,
	} = useQuery<ITherapist>({
		queryKey: ['userDetails', userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
		retry: false,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	});

	const latestSessionId = userDetails?.availability?.length
		? userDetails.availability[userDetails.availability.length - 1]
		: null;

	const { data: sessionData, isLoading: sessionDataIsLoading } = useQuery({
		queryKey: ['availabilitySession', latestSessionId],
		queryFn: async () => {
			if (!latestSessionId) return null;
			return getAvailabilitySession(latestSessionId as Partial<IAvailability>);
		},
		enabled: !!latestSessionId,
	});

	const therapistIdFromStorage = useSecureStorage(
		THERAPIST_ID,
		userDetails?._id,
		1440,
		'local'
	);

	const therapistId: string = useMemo(() => {
		return Object.is(user, null) ? userDetails?._id : therapistIdFromStorage;
	}, [therapistIdFromStorage, user, userDetails?._id]);

	return {
		...context,
		userDetails,
		isUserDetailsLoading: isUserDetailsLoading,
		isUserDetailsSucces,
		therapistId,
		sessionData,
		sessionDataIsLoading,
		latestSessionId,
	};
};
