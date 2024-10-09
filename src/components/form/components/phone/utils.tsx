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
