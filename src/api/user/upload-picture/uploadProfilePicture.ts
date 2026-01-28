import { confirmProfilePicture, presignProfilePicture } from './index';
import type { AllowedProfilePictureContentType } from './index.types';
import { uploadToS3WithPresignedPut } from './uploadToS3';

type UploadProfilePictureResult = {
	key: string;
	publicUrl?: string;
};

const isAllowedContentType = (
	value: string
): value is AllowedProfilePictureContentType =>
	value === 'image/jpeg' || value === 'image/png' || value === 'image/webp';

export const uploadProfilePicture = async (
	file: File
): Promise<UploadProfilePictureResult> => {
	if (!isAllowedContentType(file.type)) {
		throw new Error('Invalid file type');
	}

	const presign = await presignProfilePicture({ contentType: file.type });

	if (file.size > presign.maxBytes) {
		throw new Error('File is too large');
	}

	await uploadToS3WithPresignedPut({
		uploadUrl: presign.uploadUrl,
		file,
		contentType: file.type,
	});

	const confirmed = await confirmProfilePicture({ key: presign.key });

	return { key: confirmed.picture, publicUrl: confirmed.publicUrl };
};
