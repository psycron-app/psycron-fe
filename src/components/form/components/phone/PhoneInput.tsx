import { useEffect, useState } from 'react';
import type { FieldValues, Path, PathValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, type SelectChangeEvent } from '@mui/material';
import countryList from '@psycron/assets/countries/countries.json';
import { Info, Logo } from '@psycron/components/icons';
import { Select } from '@psycron/components/select/Select';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { useUserGeolocation } from '@psycron/context/geolocation/CountryContext';
import type { CountryDataSimple } from '@psycron/context/geolocation/CountryContext.types';
import { palette } from '@psycron/theme/palette/palette.theme';

import { CountryFlag, PhoneNumberField } from './PhoneInput.styles';
import type { PhoneInputProps } from './PhoneInput.types';

export const PhoneInput = <T extends FieldValues>({
	register,
	registerName,
	errors,
	defaultValue,
	setValue,
	disabled,
	required,
}: PhoneInputProps<T>) => {
	const { t } = useTranslation();
	const { countryData } = useUserGeolocation();

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
				setValue(registerName as Path<T>, number as PathValue<T, Path<T>>);
				setValue(
					'countryCode' as Path<T>,
					countryCode as PathValue<T, Path<T>>
				);
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
		setValue(registerName as Path<T>, newValue as PathValue<T, Path<T>>);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(registerName as Path<T>, newValue as PathValue<T, Path<T>>);
	};

	const handlePhoneChange = (e: SelectChangeEvent<string>) => {
		const newCountry = countryList.find((c) => c.dialCode === e.target.value);

		setSelectedCountry({
			callingCode: e.target.value,
			countryEmoji: newCountry?.flag,
		});
		setValue('countryCode' as Path<T>, e.target.value as PathValue<T, Path<T>>);
	};

	const inputRegisterName = t(`globals.${registerName}`);

	return (
		<Grid
			container
			columns={12}
			direction='row'
			alignItems='center'
			columnSpacing={2}
		>
			<Grid xs={1} pl={0}>
				<CountryFlag>
					{countryData.callingCode === null ? (
						<Logo />
					) : (
						<span>{selectedCountry?.countryEmoji}</span>
					)}
				</CountryFlag>
			</Grid>
			<Grid xs={4}>
				<Select
					items={countries}
					required={required}
					selectLabel={t('components.input.phone-input.select-label')}
					{...register('countryCode' as Path<T>)}
					subtitle
					value={selectedCountry.callingCode ?? ''}
					fullWidth
					onChangeSelect={handlePhoneChange}
					disabled={disabled}
					hidePrimaryValue
				/>
			</Grid>
			<Grid xs={6.5}>
				<PhoneNumberField
					type='tel'
					label={t('components.input.phone-input.phone-num-label', {
						registerName: inputRegisterName,
					})}
					required={required}
					fullWidth
					value={phoneNumber}
					{...register(registerName as Path<T>)}
					autoComplete='tel'
					error={!!errors?.[registerName]}
					helperText={errors?.[registerName]?.message as string}
					onChange={handleInputChange}
					onBlur={handleBlur} // 🔥 Captura o autofill
					disabled={disabled}
				/>
			</Grid>
			<Grid xs={0.5}>
				<Tooltip title={t('components.input.phone-input.phone-number-guide')}>
					<Info color={palette.info.main} />
				</Tooltip>
			</Grid>
		</Grid>
	);
};
