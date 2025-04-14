import type { CountryCode } from 'libphonenumber-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const formatPhoneNumber = (
	countryCode: string,
	phone: string
): string => {
	const cleanCountryCode = countryCode.replace(/[^\d]/g, '');
	const cleanPhone = phone.replace(/[^\d]/g, '');

	if (cleanPhone.startsWith(cleanCountryCode)) {
		return `+${cleanPhone}`;
	}

	return `+${cleanCountryCode}${cleanPhone}`;
};

export const isPhoneValid = (
	number: string,
	countryIsoCode: CountryCode
): boolean => {
	try {
		const parsed = parsePhoneNumberFromString(number, countryIsoCode);
		return parsed?.isValid() ?? false;
	} catch {
		return false;
	}
};
