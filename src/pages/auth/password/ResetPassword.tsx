import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { AlertProps } from '@mui/material';
import { Box } from '@mui/material';
import { requestPassReset } from '@psycron/api/auth';
import type { CustomError } from '@psycron/api/error';
import { Button } from '@psycron/components/button/Button';
import { SignLayout } from '@psycron/components/form/components/shared/SignLayout';
import { InputFields } from '@psycron/components/form/components/shared/SignLayout.styles';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { useMutation } from '@tanstack/react-query';

import { AuthPageWrapper } from '../index.styles';

import type { IEmailForm } from './ResetPassword.types';

export const ResetPassword = () => {
	const { t } = useTranslation();

	const [resetPassError, setResetPassError] = useState<string | null>(null);
	const { showAlert } = useAlert();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const reqPassReset = useMutation({
		mutationFn: requestPassReset,
		onSuccess: (data) => {
			showAlert({
				message: data.message,
				severity: data.status as AlertProps['severity'],
			});
		},
		onError: (error: CustomError) => {
			setResetPassError(t(error.message));
		},
	});

	const onSubmit = (data: IEmailForm) => {
		reqPassReset.mutate(data);
	};

	return (
		<AuthPageWrapper>
			<SignLayout isReset>
				<Box
					component='form'
					display='flex'
					flexDirection='column'
					onSubmit={handleSubmit(onSubmit)}
					width='18.75rem'
					gap={spacing.small}
				>
					<InputFields
						label={t('globals.email')}
						fullWidth
						id='email'
						{...register('email')}
						autoComplete='email'
						error={!!errors.email || !!resetPassError?.length}
						helperText={resetPassError}
					/>
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='flex-start'
						alignItems='center'
					>
						<Button type='submit' fullWidth>
							{t('page.reset-password.reset')}
						</Button>
					</Box>
				</Box>
			</SignLayout>
		</AuthPageWrapper>
	);
};
