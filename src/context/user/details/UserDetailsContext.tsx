import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
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

	const navigate = useNavigate();
	const { user } = useAuth();

	const toggleUserDetails = useCallback(() => {
		setIsUserDetailsVisible((prev) => !prev);
	}, []);

	const openDeleteDialog = useCallback(() => setIsDeleteOpen(true), []);
	const closeDeleteDialog = useCallback(() => setIsDeleteOpen(false), []);

	const handleClickEditUser = useCallback(
		(id: string) => {
			navigate(`${EDITUSERPATH}/${id}`);
			if (isUserDetailsVisible === false) {
				return;
			}
			return toggleUserDetails();
		},
		[isUserDetailsVisible, navigate, toggleUserDetails]
	);

	const handleClickEditSession = useCallback(
		(userId: string, session: string) => {
			const editUserPath = `${EDITUSERPATH}/${userId}`;
			navigate(`${editUserPath}/${session}`);
			toggleUserDetails();
		},
		[navigate, toggleUserDetails]
	);

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

	const { user: sessionUser, toggleUserDetails, closeDeleteDialog } = context;

	const queryClient = useQueryClient();
	const { t } = useTranslation();

	const sessionUserId = sessionUser?._id;
	const userId = passedUserId ?? sessionUserId ?? null;

	const isOwnSettings =
		Boolean(sessionUserId) &&
		(passedUserId == null || passedUserId === sessionUserId);

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

	const latestSessionId = useMemo(() => {
		const ids = userDetails?.availability ?? [];
		return ids.length ? ids[ids.length - 1] : null;
	}, [userDetails?.availability]);

	const therapistIdFromStorage = useSecureStorage(
		THERAPIST_ID,
		userDetails?._id,
		1440,
		'local'
	);

	const therapistId = useMemo(() => {
		return sessionUserId ?? therapistIdFromStorage ?? userDetails?._id ?? '';
	}, [sessionUserId, therapistIdFromStorage, userDetails?._id]);

	const deleteMyAccountMutation = useMutation({
		mutationFn: async () => {
			if (!sessionUserId) throw new Error(t('auth.error.not-found'));
			if (!isOwnSettings) throw new Error(t('auth.error.not-allowed'));
			return deleteUserById(sessionUserId);
		},
		onSuccess: async () => {
			clearAuthTokens();
			queryClient.clear();
			closeDeleteDialog();
			toggleUserDetails();
		},
	});

	const deleteMyAccount = useCallback(() => {
		deleteMyAccountMutation.mutate();
	}, [deleteMyAccountMutation]);

	const downloadMyDataMutation = useMutation({
		mutationFn: async () => {
			if (!sessionUserId) throw new Error(t('auth.error.not-found'));
			if (!isOwnSettings) throw new Error(t('auth.error.not-allowed'));
			return exportUserDataById(sessionUserId);
		},
		onSuccess: (blob) => {
			// avoid crashing if session user is missing
			const profile = userDetails ?? sessionUser;
			const safeFirst = profile?.firstName ?? 'User';
			const safeLast = profile?.lastName ?? 'Psycron';

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${safeFirst}-${safeLast}-Psycron-data-export.json`;

			document.body.appendChild(a);
			a.click();
			a.remove();

			window.URL.revokeObjectURL(url);
		},
	});

	const downloadMyData = useCallback(() => {
		downloadMyDataMutation.mutate();
	}, [downloadMyDataMutation]);

	return {
		...context,
		userDetails,
		isUserDetailsLoading,
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
