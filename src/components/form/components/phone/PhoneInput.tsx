import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import pt from 'react-phone-number-input/locale/pt';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { useUserGeolocation } from '@psycron/context/geolocation/CountryContext';
import { palette } from '@psycron/theme/palette/palette.theme';

import 'react-phone-number-input/style.css';

import { StyledPhoneInput } from './PhoneInput.styles';
import type { PhoneInputProps } from './PhoneInput.types';

export const PhoneInputComponent = ({
	registerName,
	defaultValue,
	disabled,
	required,
}: PhoneInputProps) => {
	const { t } = useTranslation();

	const labelsMap: Record<string, Record<string, string>> = {
		en,
		pt,
	};

	const { locale } = useParams<{ locale: string }>();
	const labels = labelsMap[locale] ?? en;

	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext();

	const { countryData } = useUserGeolocation();
	const defaultCountry = countryData.countryCode2 ?? 'BR';

	useEffect(() => {
		if (defaultValue) {
			setValue(registerName, defaultValue);
		}
	}, [defaultValue, registerName, setValue]);

	const inputRegisterName = t(`globals.${registerName}`);

	return (
		<Box width='100%'>
			<Controller
				name={registerName}
				control={control}
				defaultValue={defaultValue ?? ''}
				render={({ field }) => (
					<StyledPhoneInput>
						<PhoneInput
							labels={labels}
							defaultCountry={defaultCountry}
							value={field.value}
							onChange={(value) => {
								field.onChange(value);
								setValue(registerName, value);
							}}
							onBlur={field.onBlur}
							disabled={disabled}
							autoComplete='tel'
							placeholder={t('components.input.phone-input.phone-num-label', {
								registerName: inputRegisterName,
							})}
							required={required}
						/>
					</StyledPhoneInput>
				)}
			/>
			{errors?.[registerName] && (
				<Text variant='caption' color={palette.error.main}>
					{errors[registerName]?.message as string}
				</Text>
			)}
		</Box>
	);
};
