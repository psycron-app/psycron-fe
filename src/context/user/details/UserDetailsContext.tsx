import { createContext, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
	deleteUserById,
	exportUserDataById,
	getUserById,
} from '@psycron/api/user';
import { useSecureStorage } from '@psycron/hooks/useSecureStorage';
import { EDITUSERPATH } from '@psycron/pages/urls';
import { ID_TOKEN, REFRESH_TOKEN, THERAPIST_ID } from '@psycron/utils/tokens';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../auth/UserAuthenticationContext';
import type { ITherapist } from '../auth/UserAuthenticationContext.types';

import type {
	EditSession,
	UserDetailsContextType,
	UserDetailsProviderProps,
} from './UserDetailsContext.types';

export const UserDetailsContext = createContext<
	UserDetailsContextType | undefined
>(undefined);

const clearAuthTokens = (): void => {
	localStorage.removeItem(ID_TOKEN);
	localStorage.removeItem(REFRESH_TOKEN);
	localStorage.removeItem(THERAPIST_ID);
};

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
	const [isUserDetailsVisible, setIsUserDetailsVisible] = useState(false);

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const openDeleteDialog = () => setIsDeleteOpen(true);
	const closeDeleteDialog = () => setIsDeleteOpen(false);

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

		const specialPaths: Record<EditSession, string> = {
			password: `${editUserPath}/password`,
			subscription: '/subscription-manager',
			patients: '/patients-manager',
		};

		if (session in specialPaths) {
			navigate(specialPaths[session as EditSession]);
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
				isDeleteOpen,
				openDeleteDialog,
				closeDeleteDialog,
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

	const { user, toggleUserDetails } = context;

	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const userId = passedUserId ?? user?._id ?? null;

	const isOwnSettings =
		Boolean(user?._id) && (passedUserId == null || passedUserId === user._id);

	const {
		data: userDetails,
		isLoading: isUserDetailsLoading,
		isSuccess: isUserDetailsSucces,
	} = useQuery<ITherapist>({
		queryKey: ['userDetails', userId],
		queryFn: async () => {
			if (!userId) throw new Error(t('auth.error.not-found'));
			return getUserById(userId);
		},
		enabled: Boolean(userId),
		retry: false,
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 10,
	});

	const deleteMyAccountMutation = useMutation({
		mutationFn: async () => {
			if (!user?._id) {
				throw new Error(t('auth.error.not-found'));
			}
			if (!isOwnSettings) {
				throw new Error(t('auth.error.not-allowed'));
			}
			return deleteUserById(user._id);
		},
		onSuccess: async () => {
			clearAuthTokens();
			queryClient.clear();
			toggleUserDetails();
		},
	});

	const deleteMyAccount = () => {
		deleteMyAccountMutation.mutate();
	};

	const downloadMyDataMutation = useMutation({
		mutationFn: async () => {
			if (!user?._id) throw new Error(t('auth.error.not-found'));
			if (!isOwnSettings) throw new Error(t('auth.error.not-allowed'));
			return exportUserDataById(user._id);
		},
		onSuccess: (blob) => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');

			a.href = url;
			a.download = `${user.firstName}-${user.lastName}-Psycron-data-export.json`;
			document.body.appendChild(a);
			a.click();
			a.remove();

			window.URL.revokeObjectURL(url);
		},
	});

	const downloadMyData = () => downloadMyDataMutation.mutate();

	const latestSessionId = userDetails?.availability?.length
		? userDetails.availability[userDetails.availability.length - 1]
		: null;

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
		latestSessionId,
		isOwnSettings,
		deleteMyAccount,
		isDeletePending: deleteMyAccountMutation.isPending,
		deleteError: deleteMyAccountMutation.error,
		downloadMyData,
		isDownloadPending: downloadMyDataMutation.isPending,
		downloadError: downloadMyDataMutation.error,
	};
};
