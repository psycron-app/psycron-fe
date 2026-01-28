import type { UploadToS3Args } from './index.types';

export const uploadToS3WithPresignedPut = async ({
	uploadUrl,
	file,
	contentType,
}: UploadToS3Args): Promise<void> => {
	const res = await fetch(uploadUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': contentType,
		},
		body: file,
	});

	if (!res.ok) {
		throw new Error('Upload failed');
	}
};
