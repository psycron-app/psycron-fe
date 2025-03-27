import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Grid, type SelectChangeEvent } from '@mui/material';
import countryList from '@psycron/assets/countries/countries.json';
import { Logo } from '@psycron/components/icons';
import { Select } from '@psycron/components/select/Select';
import { Text } from '@psycron/components/text/Text';
import { useUserGeolocation } from '@psycron/context/geolocation/CountryContext';
import type { CountryDataSimple } from '@psycron/context/geolocation/CountryContext.types';
import { palette } from '@psycron/theme/palette/palette.theme';

import { CountryFlag, PhoneNumberField } from './PhoneInput.styles';
import type { PhoneInputProps } from './PhoneInput.types';

export const PhoneInput = ({
	registerName,
	defaultValue,
	disabled,
	required,
}: PhoneInputProps) => {
	const { t } = useTranslation();
	const { countryData } = useUserGeolocation();
	const {
		setValue,
		register,
		formState: { errors },
	} = useFormContext();

	const [selectedCountry, setSelectedCountry] = useState<
		CountryDataSimple & { name?: string }
	>(countryData);
	const [phoneNumber, setPhoneNumber] = useState<string>('');

	const countries = countryList.map((c) => ({
		name: c.name,
		value: c.dialCode,
	}));

	useEffect(() => {
		if (defaultValue) {
			const foundCountry = countries.find((c) =>
				defaultValue.startsWith(c.value)
			);
			const countryCode = foundCountry?.value ?? countryData.callingCode;
			const number = defaultValue.replace(countryCode, '').trim();

			setSelectedCountry((prev) =>
				prev.callingCode === countryCode
					? prev
					: {
							callingCode: countryCode,
							countryEmoji: countryList.find((c) => c.dialCode === countryCode)
								?.flag,
						}
			);

			if (phoneNumber !== number) {
				setPhoneNumber(number);
				setValue(registerName, number);
				setValue('countryCode', countryCode);
			}
		}
	}, [
		defaultValue,
		registerName,
		setValue,
		countries,
		countryData,
		phoneNumber,
	]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setPhoneNumber(newValue);
		setValue(registerName, newValue);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(registerName, newValue);
	};

	const handlePhoneChange = (e: SelectChangeEvent<string>) => {
		const newCountry = countryList.find((c) => c.dialCode === e.target.value);

		setSelectedCountry({
			callingCode: e.target.value,
			countryEmoji: newCountry?.flag,
		});
		setValue('countryCode', e.target.value);
	};

	const inputRegisterName = t(`globals.${registerName}`);

	return (
		<Box>
			<Grid
				container
				columns={12}
				direction='row'
				alignItems='center'
				justifyContent='center'
				columnSpacing={2}
			>
				<Grid size={1} pl={0}>
					<CountryFlag>
						{countryData.callingCode === null ? (
							<Logo />
						) : (
							<span>{selectedCountry?.countryEmoji}</span>
						)}
					</CountryFlag>
				</Grid>
				<Grid size={3}>
					<Select
						items={countries}
						required={required}
						selectLabel={t('components.input.phone-input.select-label')}
						{...register('countryCode')}
						subtitle
						value={selectedCountry.callingCode ?? ''}
						fullWidth
						onChangeSelect={handlePhoneChange}
						disabled={disabled}
						hidePrimaryValue
					/>
				</Grid>
				<Grid size={8}>
					<PhoneNumberField
						type='tel'
						label={t('components.input.phone-input.phone-num-label', {
							registerName: inputRegisterName,
						})}
						required={required}
						fullWidth
						value={phoneNumber}
						{...register(registerName)}
						autoComplete='tel'
						error={!!errors?.[registerName]}
						helperText={errors?.[registerName]?.message as string}
						onChange={handleInputChange}
						onBlur={handleBlur}
						disabled={disabled}
					/>
				</Grid>
			</Grid>
			<Box textAlign='center'>
				<Text variant='caption' color={palette.error.main}>
					{t('components.input.phone-input.phone-number-guide')}
				</Text>
			</Box>
		</Box>
	);
};
