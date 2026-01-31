import apiClient from '@psycron/api/axios-instance';
import { ASSETS_CDN_URL } from '@psycron/utils/variables';

import type {
	IConfirmProfilePictureRequest,
	IConfirmProfilePictureResponse,
	IPresignProfilePictureRequest,
	IPresignProfilePictureResponse,
} from './index.types';

const isAbsoluteUrl = (value: string): boolean => {
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:';
	} catch {
		return false;
	}
};

export const buildCdnUrl = (key: string | null | undefined): string | null => {
	if (!key) return null;
	if (isAbsoluteUrl(key)) return null; // do not rewrite external URLs

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
