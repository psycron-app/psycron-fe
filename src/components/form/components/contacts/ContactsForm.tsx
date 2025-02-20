import { useEffect, useState } from 'react';
import type { FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { TextFieldProps } from '@mui/material';
import { Box, TextField } from '@mui/material';
import { Switch } from '@psycron/components/switch/components/item/Switch';

import { PhoneInput } from '../phone/PhoneInput';

import type { ContactsFormProps } from './ContactsForm.types';

export const ContactsForm = <T extends FieldValues>({
	errors,
	getPhoneValue,
	setPhoneValue,
	register,
	defaultValues,
	disabled,
	setValue,
	required,
}: ContactsFormProps<T> & TextFieldProps) => {
	const { t } = useTranslation();

	const [hasWhatsApp, setHasWhatsApp] = useState<boolean>(false);

	const [isPhoneWpp, setIsPhoneWpp] = useState<boolean>(true);

	useEffect(() => {
		const phoneValue = getPhoneValue('phone' as Path<T>);
		if (isPhoneWpp) {
			setPhoneValue('whatsapp' as Path<T>, phoneValue);
		} else {
			setPhoneValue(
				'whatsapp' as Path<T>,
				getPhoneValue('whatsapp' as Path<T>)
			);
		}
	}, [getPhoneValue, isPhoneWpp, setPhoneValue]);

	return (
		<Box>
			<Box pb={1}>
				<TextField
					label={t('globals.email')}
					fullWidth
					id='email'
					defaultValue={defaultValues?.email}
					placeholder={
						!defaultValues?.email && t('components.input.text.email')
					}
					{...register('email' as Path<T>)}
					autoComplete='email'
					error={!!errors?.email}
					helperText={errors?.email?.message as string}
					required={required}
					disabled={disabled}
				/>
			</Box>
			<Box>
				<PhoneInput
					errors={errors}
					register={register}
					registerName='phone'
					defaultValue={getPhoneValue('phone' as Path<T>)}
					disabled={disabled}
					setValue={setValue}
					required={required}
				/>
			</Box>
			<Box>
				<Box display='flex'>
					<Switch
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
					<Box display='flex'>
						<Switch
							onChange={() => setIsPhoneWpp((prev) => !prev)}
							value={isPhoneWpp}
							defaultChecked={isPhoneWpp}
							label={t('components.form.contacts-form.contact-via-same')}
						/>
					</Box>
				) : null}
				<input type='hidden' {...register('whatsapp' as Path<T>)} />
				{hasWhatsApp && !isPhoneWpp && (
					<Box>
						<PhoneInput
							errors={errors}
							register={register}
							registerName='whatsapp'
							defaultValue={getPhoneValue('whatsapp' as Path<T>)}
							setValue={setValue}
							required={required}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};
