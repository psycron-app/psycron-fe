import { useEffect, useState } from 'react';
import type { FieldError, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import type { TextFieldProps } from '@mui/material';
import { InputAdornment, TextField } from '@mui/material';
import { NotVisible, Visible } from '@psycron/components/icons';
import { useAuth } from '@psycron/context/user/auth/UserAuthenticationContext';

import {
	PasswordWrapper,
	StyledIconButton,
	StyledInput,
} from './PasswordInput.styles';
import type { PasswordInputProps } from './PasswordInput.types';

export const PasswordInput = <T extends FieldValues>({
	hasToConfirm,
	errors,
	register,
	defaultPasswordHash,
	disabled,
}: PasswordInputProps<T> & TextFieldProps) => {
	const { t } = useTranslation();

	const { signInError } = useAuth();
	const { pathname } = useLocation();

	const passInputId = pathname.includes('edit/') ? 'newPassword' : 'password';

	const passwordInputId: Path<T> = passInputId as Path<T>;
	const confirmPasswordInputId: Path<T> = 'confirmPassword' as Path<T>;

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState<boolean>(false);

	const [passwordValue, setPasswordValue] = useState<string>('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');

	useEffect(() => {
		if (defaultPasswordHash) {
			setPasswordValue(defaultPasswordHash);
		}
	}, [defaultPasswordHash]);

	const toggleVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const toggleVisibilityConfirm = () => {
		setIsConfirmPasswordVisible((prev) => !prev);
	};

	const handleInputChange = (id: Path<T>, value: string) => {
		if (id === passwordInputId) {
			setPasswordValue(value);
		} else if (id === confirmPasswordInputId) {
			setConfirmPasswordValue(value);
		}
	};

	const getHelperText = (fieldId: Path<T>): React.ReactNode => {
		if (typeof signInError === 'string') {
			return signInError;
		}
		if (typeof errors === 'string') {
			return errors;
		} else if (
			errors &&
			errors[fieldId] &&
			'message' in (errors[fieldId] as FieldError)
		) {
			return (errors[fieldId] as FieldError).message;
		}
		return null;
	};

	return (
		<PasswordWrapper>
			<StyledInput
				label={t('globals.password')}
				id={passwordInputId}
				fullWidth
				type={!isPasswordVisible ? 'password' : 'text'}
				{...register(passwordInputId)}
				error={!!getHelperText(passwordInputId)}
				helperText={getHelperText(passwordInputId)}
				value={passwordValue}
				autoComplete='password'
				onChange={(e) => {
					handleInputChange(passwordInputId, e.target.value);
				}}
				disabled={disabled}
				required
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<StyledIconButton
								disabled={!passwordValue?.length}
								onMouseEnter={() => toggleVisibility()}
								onMouseLeave={() => toggleVisibility()}
								edge='end'
							>
								{!isPasswordVisible ? <NotVisible /> : <Visible />}
							</StyledIconButton>
						</InputAdornment>
					),
				}}
				hasToConfirm={hasToConfirm}
			/>
			{hasToConfirm ? (
				<TextField
					label={t('components.form.confirm-password')}
					fullWidth
					id={confirmPasswordInputId}
					type={!isConfirmPasswordVisible ? 'password' : 'text'}
					{...register(confirmPasswordInputId)}
					error={!!getHelperText(confirmPasswordInputId)}
					helperText={getHelperText(confirmPasswordInputId)}
					value={confirmPasswordValue}
					autoComplete='confirm-password'
					onChange={(e) => {
						handleInputChange(confirmPasswordInputId, e.target.value);
					}}
					required={hasToConfirm}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<StyledIconButton
									disabled={!confirmPasswordValue?.length}
									onMouseEnter={() => toggleVisibilityConfirm()}
									onMouseLeave={() => toggleVisibilityConfirm()}
									edge='end'
								>
									{!isConfirmPasswordVisible ? <NotVisible /> : <Visible />}
								</StyledIconButton>
							</InputAdornment>
						),
					}}
				/>
			) : null}
		</PasswordWrapper>
	);
};
