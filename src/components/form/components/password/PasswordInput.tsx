import { useMemo, useState } from 'react';
import type { FieldValues, Path } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { InputAdornment, TextField } from '@mui/material';
import { NotVisible, Visible } from '@psycron/components/icons';

import { PasswordWrapper, StyledIconButton } from './PasswordInput.styles';
import type { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = <T extends FieldValues>({
	name,
	confirmName,
	hasToConfirm,
	disabled,
}: PasswordInputProps<T>) => {
	const { t } = useTranslation();
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<T>();

	const passwordName = useMemo(() => name ?? ('password' as Path<T>), [name]);

	const confirmFieldName = useMemo(
		() => confirmName ?? ('confirmPassword' as Path<T>),
		[confirmName]
	);

	const passwordValue = watch(passwordName) as unknown as string | undefined;
	const confirmValue = watch(confirmFieldName) as unknown as string | undefined;

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const passwordError = errors?.[passwordName];
	const confirmError = errors?.[confirmFieldName];

	const passwordHelper =
		typeof passwordError === 'object' &&
		passwordError &&
		'message' in passwordError
			? String(passwordError.message ?? '')
			: undefined;

	const confirmHelper =
		typeof confirmError === 'object' &&
		confirmError &&
		'message' in confirmError
			? String(confirmError.message ?? '')
			: undefined;

	return (
		<PasswordWrapper>
			<TextField
				label={t('globals.password')}
				id={String(passwordName)}
				fullWidth
				variant='outlined'
				type={showPassword ? 'text' : 'password'}
				{...register(passwordName)}
				error={Boolean(passwordHelper)}
				helperText={passwordHelper}
				autoComplete='current-password'
				disabled={disabled}
				required
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position='end'>
								<StyledIconButton
									disabled={!passwordValue?.length}
									onClick={() => setShowPassword((p) => !p)}
									edge='end'
									aria-label={showPassword ? 'Hide password' : 'Show password'}
								>
									{showPassword ? <Visible /> : <NotVisible />}
								</StyledIconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			{hasToConfirm ? (
				<TextField
					label={t('components.form.confirm-password')}
					fullWidth
					id={String(confirmFieldName)}
					variant='outlined'
					type={showConfirm ? 'text' : 'password'}
					{...register(confirmFieldName)}
					error={Boolean(confirmHelper)}
					helperText={confirmHelper}
					autoComplete='new-password'
					disabled={disabled}
					required
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position='end'>
									<StyledIconButton
										disabled={!confirmValue?.length}
										onClick={() => setShowConfirm((p) => !p)}
										edge='end'
										aria-label={
											showConfirm
												? 'Hide confirm password'
												: 'Show confirm password'
										}
									>
										{showConfirm ? <Visible /> : <NotVisible />}
									</StyledIconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			) : null}
		</PasswordWrapper>
	);
};
