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
}: PhoneInputProps<T>) => {
	const { t } = useTranslation();
	const { countryData } = useUserGeolocation();

	const [selectedCountry, setSelectedCountry] = useState<
		CountryDataSimple & { name?: string }
	>(countryData);
	const [defaultNumberVal, setDefaultNumberVal] = useState<string>('');

	// Lista de países para seleção
	const countries = countryList.map((c) => ({
		name: c.name,
		value: c.dialCode,
	}));

	// Encontrar país pelo código
	const findCountry = (
		countries: { name: string; value: string }[],
		value?: string
	) => countries.find((country) => value?.includes(country.value));

	const foundCountryCode = findCountry(countries, defaultValue);

	// 🔥 1. Sincroniza o valor inicial do telefone com o formulário
	useEffect(() => {
		if (defaultValue) {
			const phoneWithoutCountryCode = defaultValue.replace(
				String(foundCountryCode?.value),
				''
			);
			setDefaultNumberVal(phoneWithoutCountryCode);

			// 🔥 Corrigindo a tipagem de `setValue`
			setValue(
				registerName as Path<T>,
				phoneWithoutCountryCode as PathValue<T, Path<T>>
			);
		}
	}, [defaultValue, registerName, setValue, foundCountryCode]);

	// 🔥 2. Atualiza o valor do telefone no formulário ao digitar
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setDefaultNumberVal(newValue);
		setValue(registerName as Path<T>, newValue as PathValue<T, Path<T>>);
	};

	// 🔥 3. Captura o autofill do Chrome
	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(registerName as Path<T>, newValue as PathValue<T, Path<T>>);
	};

	// Atualiza o código do país ao mudar a seleção
	const handlePhoneChange = (e: SelectChangeEvent<string>) => {
		setSelectedCountry({
			callingCode: e.target.value,
			countryEmoji: countryList.find((c) => c.dialCode === e.target.value)
				?.flag,
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
			<Grid item xs={1} pl={0}>
				<CountryFlag>
					{countryData.callingCode === null ? (
						<Logo />
					) : (
						<span>{selectedCountry?.countryEmoji}</span>
					)}
				</CountryFlag>
			</Grid>
			<Grid item xs={4}>
				<Select
					items={countries}
					required
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
			<Grid item xs={6.5}>
				<PhoneNumberField
					type='tel'
					label={t('components.input.phone-input.phone-num-label', {
						registerName: inputRegisterName,
					})}
					required
					fullWidth
					value={defaultNumberVal}
					{...register(registerName as Path<T>, { required: true })}
					autoComplete='tel'
					error={!!errors?.[registerName]}
					helperText={errors?.[registerName]?.message as string}
					onChange={handleInputChange}
					onBlur={handleBlur} // 🔥 Captura o autofill
					disabled={disabled}
				/>
			</Grid>
			<Grid item xs={0.5}>
				<Tooltip title={t('components.input.phone-input.phone-number-guide')}>
					<Info color={palette.info.main} />
				</Tooltip>
			</Grid>
		</Grid>
	);
};
