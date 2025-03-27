import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextFieldProps } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import useViewport from '@psycron/hooks/useViewport';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import { PhoneInput } from '../phone/PhoneInput';

import { InputWrapper } from './ContactsForm.styles';
import type { ContactsFormProps } from './ContactsForm.types';

export const ContactsForm = ({
	defaultValues,
	disabled,
	required,
}: ContactsFormProps & TextFieldProps) => {
	const { t } = useTranslation();
	const { isSmallerThanTablet } = useViewport();

	const {
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useFormContext();

	const [hasWhatsApp, setHasWhatsApp] = useState<boolean>(false);
	const [isPhoneWpp, setIsPhoneWpp] = useState<boolean>(false);

	useEffect(() => {
		setValue('hasWhatsApp', hasWhatsApp);
	}, [hasWhatsApp, setValue]);

	useEffect(() => {
		setValue('isPhoneWpp', isPhoneWpp);
	}, [isPhoneWpp, setValue]);

	return (
		<Box display='flex' flexDirection='column' width='100%'>
			<InputWrapper>
				<TextField
					label={t('globals.email')}
					fullWidth
					id='email'
					defaultValue={defaultValues?.email}
					placeholder={
						!defaultValues?.email && t('components.input.text.email')
					}
					{...register('email')}
					autoComplete='email'
					error={!!errors?.email}
					helperText={errors?.email?.message as string}
					required={required}
					disabled={disabled}
				/>
			</InputWrapper>
			<Box>
				<PhoneInput
					registerName='phone'
					defaultValue={getValues('phone')}
					disabled={disabled}
					required={required}
				/>
			</Box>
			<Box>
				<Box display='flex' pl={spacing.small}>
					<Switch
						small={isSmallerThanTablet}
						onChange={() => setHasWhatsApp((prev) => !prev)}
						value={!hasWhatsApp}
						defaultChecked={hasWhatsApp}
						label={t('components.form.contacts-form.contact-via', {
							method: 'Whatsapp',
						})}
						disabled={disabled}
					/>
				</Box>
				{hasWhatsApp ? (
					<Box display='flex' pl={spacing.small}>
						<Switch
							small={isSmallerThanTablet}
							onChange={() => setIsPhoneWpp((prev) => !prev)}
							value={isPhoneWpp}
							defaultChecked={isPhoneWpp}
							label={t('components.form.contacts-form.contact-via-same')}
						/>
					</Box>
				) : null}
				<input type='hidden' {...register('isPhoneWpp')} />
				{hasWhatsApp && !isPhoneWpp && (
					<Box>
						<PhoneInput
							registerName='whatsapp'
							defaultValue={getValues('whatsapp')}
							required={required}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};
