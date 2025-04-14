import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';

import {
	FirstNameInputWrapper,
	LastNameInputWrapper,
	NameFormWrapper,
} from './NameForm.styles';
import type { NameFormProps } from './NameForm.types';

export const NameForm = ({
	placeholderFirstName,
	placeholderLastName,
	disabled,
	required,
}: NameFormProps & TextFieldProps) => {
	const { t } = useTranslation();

	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<NameFormWrapper>
			<FirstNameInputWrapper>
				<TextField
					label={t('components.form.signup.firstName')}
					fullWidth
					id='firstName'
					defaultValue={placeholderFirstName}
					placeholder={
						!placeholderFirstName?.length &&
						t('components.input.text.first-name')
					}
					{...register('firstName')}
					error={!!errors.firstName}
					helperText={errors.firstName?.message as string}
					required={required}
					disabled={disabled}
				/>
			</FirstNameInputWrapper>
			<LastNameInputWrapper>
				<TextField
					label={t('components.form.signup.lastName')}
					fullWidth
					id='lastName'
					defaultValue={placeholderLastName}
					placeholder={
						!placeholderLastName?.length && t('components.input.text.last-name')
					}
					{...register('lastName')}
					error={!!errors?.lastName}
					helperText={errors?.lastName?.message as string}
					required={required}
					disabled={disabled}
				/>
			</LastNameInputWrapper>
		</NameFormWrapper>
	);
};
