export type AllowedProfilePictureContentType =
	| 'image/jpeg'
	| 'image/png'
	| 'image/webp';

export interface IPresignProfilePictureRequest {
	contentType: AllowedProfilePictureContentType;
}

export interface IPresignProfilePictureResponse {
	key: string;
	maxBytes: number;
	publicUrl?: string;
	uploadUrl: string;
}

export interface IConfirmProfilePictureRequest {
	key: string;
}

export interface IConfirmProfilePictureResponse {
	picture: string;
	publicUrl?: string;
}

export type UploadToS3Args = {
	contentType: AllowedProfilePictureContentType;
	file: File;
	uploadUrl: string;
};
