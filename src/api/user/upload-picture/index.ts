import apiClient from '@psycron/api/axios-instance';
import { ASSETS_CDN_URL } from '@psycron/utils/variables';

import type {
	IConfirmProfilePictureRequest,
	IConfirmProfilePictureResponse,
	IPresignProfilePictureRequest,
	IPresignProfilePictureResponse,
} from './index.types';

export const buildCdnUrl = (key: string) => {
	const base = ASSETS_CDN_URL.replace(/\/$/, '');
	const withoutUsersPrefix = key.replace(/^users\//, '');
	return `${base}/${withoutUsersPrefix}`;
};

export const presignProfilePicture = async (
	payload: IPresignProfilePictureRequest
): Promise<IPresignProfilePictureResponse> => {
	const response = await apiClient.post<IPresignProfilePictureResponse>(
		'/users/picture/presign',
		payload
	);

	return response.data;
};

export const confirmProfilePicture = async (
	payload: IConfirmProfilePictureRequest
): Promise<IConfirmProfilePictureResponse> => {
	const response = await apiClient.post<IConfirmProfilePictureResponse>(
		'/users/picture/confirm',
		payload
	);

	return response.data;
};
