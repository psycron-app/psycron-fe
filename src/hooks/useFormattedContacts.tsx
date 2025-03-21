import type { ICreatePatientForm } from '@psycron/pages/user/appointment/add-patient/AddPatient.types';

export const getFormattedContacts = (data: ICreatePatientForm) => {
	const { phone, whatsapp, countryCode, hasWhatsApp, isPhoneWpp } = data;

	const fullPhone = countryCode ? `${countryCode}${phone}` : phone;

	let fullWhatsapp: string | undefined = undefined;

	if (hasWhatsApp) {
		fullWhatsapp = isPhoneWpp
			? fullPhone
			: countryCode
				? `${countryCode}${whatsapp}`
				: whatsapp;
	}

	return {
		fullPhone,
		fullWhatsapp,
	};
};
