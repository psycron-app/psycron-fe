import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextFieldProps } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import { NameFormWrapper, StyledNameInput } from './NameForm.styles';
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
			<Box width={'100%'}>
				<StyledNameInput
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
			</Box>
			<Box width={'100%'} pb={spacing.mediumSmall}>
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
			</Box>
		</NameFormWrapper>
	);
};
