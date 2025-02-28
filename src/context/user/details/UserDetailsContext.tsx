import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTherapistLatestAvailability, getUserById } from '@psycron/api/user';
import {
	getAppointmentDetailsBySlotId,
	getAvailabilitySession,
} from '@psycron/api/user/availability';
import { useSecureStorage } from '@psycron/hooks/useSecureStorage';
import { EDITUSERPATH } from '@psycron/pages/urls';
import { THERAPIST_ID } from '@psycron/utils/tokens';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useUserDetails = (passedUserId?: string, slotId?: string) => {
	const queryClient = useQueryClient();
	const context = useContext(UserDetailsContext);
	if (!context) {
		throw new Error('useUserDetails must be used within a UserDetailsProvider');
	}

	const { user } = context;

	const userId = passedUserId || user?._id;

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

	const {
		data: therapistLatestAvailability,
		isLoading: therapistLatestAvailabilityLoading,
		isSuccess: therapistLatestAvailabilitySuccess,
		refetch: refetchTherapistAvailability,
	} = useQuery({
		queryKey: ['therapistAvailability', userDetails?._id],
		queryFn: () => getTherapistLatestAvailability(userDetails._id),
		enabled: !!userDetails?._id && !!userDetails.availability?.length,
		retry: false,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	});

	const {
		data: appointmentDetailsBySlotId,
		isLoading: isAppointmentDetailsBySlotIdLoading,
		isSuccess: isAppointmentDetailsBySlotIdSuccess,
	} = useQuery({
		queryKey: ['getAppointmentDetailsBySlotId', slotId],
		queryFn: () => getAppointmentDetailsBySlotId(userDetails._id, slotId),
		enabled: !!userDetails?._id && !!slotId,
		retry: false,
	});

	const therapistId = useSecureStorage(
		THERAPIST_ID,
		userDetails?._id,
		1440,
		'local'
	);

	const prefetchTherapistAvailability = async () => {
		try {
			if (userDetails?._id) {
				await queryClient.prefetchQuery({
					queryKey: ['therapistAvailability'],
					queryFn: () => getTherapistLatestAvailability(userDetails._id),
				});
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Failed to prefetch therapist availability:', error);
		}
	};

	const isUserDetailsContextLoading =
		therapistLatestAvailabilityLoading || isUserDetailsLoading;

	const therapistLatestAvailabilityDates = useMemo(
		() => therapistLatestAvailability?.latestAvailability?.availabilityDates,
		[therapistLatestAvailability]
	);

	const emptyAvailability =
		!therapistLatestAvailabilityDates ||
		therapistLatestAvailabilityDates.length === 0;

	const latestSessionId =
		userDetails?.availability?.[userDetails?.availability?.length - 1];

	const { data: sessionData, isLoading: sessionDataIsLoading } = useQuery({
		queryKey: ['availabilitySession', latestSessionId],
		queryFn: () =>
			getAvailabilitySession(latestSessionId as Partial<IAvailability>),
		enabled: !!latestSessionId,
	});

	return {
		...context,
		userDetails,
		isUserDetailsLoading,
		isUserDetailsSucces,
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		therapistLatestAvailabilitySuccess,
		therapistLatestAvailabilityDates,
		emptyAvailability,
		prefetchTherapistAvailability,
		isUserDetailsContextLoading,
		therapistId,
		appointmentDetailsBySlotId,
		isAppointmentDetailsBySlotIdLoading,
		isAppointmentDetailsBySlotIdSuccess,
		refetchTherapistAvailability,
		sessionData,
		sessionDataIsLoading,
		latestSessionId,
	};
};
