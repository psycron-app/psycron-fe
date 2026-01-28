import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadProfilePicture } from '@psycron/api/user/upload-picture/uploadProfilePicture';
import { Edit } from '@psycron/components/icons/Edit';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { toCdnUrl } from '@psycron/utils/assets/assets';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Avatar } from '../Avatar';

import {
	AvatarUploaderButton,
	AvatarUploaderWrapper,
} from './AvatarUploader.styles';
import type { AvatarUploaderProps } from './AvatarUploader.types';

export const AvatarUploader = ({
	userId,
	firstName,
	lastName,
	picture,
	disabled,
}: AvatarUploaderProps) => {
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const { showAlert } = useAlert();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

	const uploadMutation = useMutation({
		mutationFn: async (file: File) => uploadProfilePicture(file),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['userDetails', userId],
			});

			showAlert({
				severity: 'success',
				message: t(
					'components.user-details.picture.upload-success',
					'Profile picture updated'
				),
			});

			if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
			setLocalPreviewUrl(null);
		},

		onError: (error) => {
			showAlert({
				severity: 'error',
				message: error.message,
			});

			if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
			setLocalPreviewUrl(null);
		},
	});

	const src = localPreviewUrl ?? toCdnUrl(picture);

	return (
		<AvatarUploaderWrapper>
			<Avatar firstName={firstName} lastName={lastName} src={src} large />

			<input
				ref={inputRef}
				type='file'
				accept='image/jpeg,image/png,image/webp'
				hidden
				onChange={(e) => {
					const file = e.currentTarget.files?.[0];
					e.currentTarget.value = '';
					if (!file) return;

					const preview = URL.createObjectURL(file);
					setLocalPreviewUrl(preview);
					uploadMutation.mutate(file);
				}}
			/>

			<AvatarUploaderButton
				disabled={disabled || uploadMutation.isPending}
				onClick={() => inputRef.current?.click()}
				aria-label={t(
					'components.user-details.picture.upload',
					'Upload picture'
				)}
			>
				<Edit />
			</AvatarUploaderButton>
		</AvatarUploaderWrapper>
	);
};
