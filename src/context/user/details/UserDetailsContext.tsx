import { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTherapistLatestAvailability, getUserById } from '@psycron/api/user';
import { getAppointmentDetailsBySlotId } from '@psycron/api/user/availability';
import { EDITUSERPATH } from '@psycron/pages/urls';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../auth/UserAuthenticationContext';
import type { ITherapist } from '../auth/UserAuthenticationContext.types';

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
	} = useQuery({
		queryKey: ['therapistAvailability'],
		queryFn: () => getTherapistLatestAvailability(userDetails._id),
		enabled: !!userId && !!userDetails?._id,
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

	const therapistId = useMemo(() => userDetails?._id, [userDetails]);

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
		() =>
			therapistLatestAvailability?.latestAvailability?.availabilityDates || [],
		[therapistLatestAvailability]
	);

	const allDataLoaded = useMemo(
		() =>
			!therapistLatestAvailabilityLoading &&
			!isUserDetailsLoading &&
			therapistLatestAvailabilitySuccess &&
			isUserDetailsSucces,
		[
			therapistLatestAvailabilityLoading,
			isUserDetailsLoading,
			therapistLatestAvailabilitySuccess,
			isUserDetailsSucces,
		]
	);

	const emptyAvailability =
		allDataLoaded && therapistLatestAvailabilityDates?.length < 1;

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
	};
};
