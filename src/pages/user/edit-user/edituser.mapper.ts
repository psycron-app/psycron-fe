// editUser.mapper.ts
import type { EditUserFormValues } from './EditUser.types';

type Contacts = {
	email?: string;
	phone?: string;
	whatsapp?: string;
};

type UserDetailsLike = {
	contacts: Contacts;
	firstName: string;
	lastName: string;
	password?: string;
};

export const toEditUserDefaults = (
	user: UserDetailsLike
): EditUserFormValues => ({
	firstName: user.firstName ?? '',
	lastName: user.lastName ?? '',
	contacts: {
		email: user.contacts?.email ?? '',
		phone: user.contacts?.phone ?? '',
		whatsapp: user.contacts?.whatsapp ?? '',
	},
	password: user.password ?? '',
});

export const buildEditUserPayload = (args: {
	enabled: { contacts: boolean; name: boolean; password?: boolean };
	original: EditUserFormValues;
	userId: string;
	values: EditUserFormValues;
}): { data: Partial<EditUserFormValues>; userId: string } => {
	const { userId, values, enabled, original } = args;

	const data: Partial<EditUserFormValues> = {};

	if (enabled.name) {
		data.firstName = values.firstName.trim() || original.firstName;
		data.lastName = values.lastName.trim() || original.lastName;
	}

	if (enabled.contacts) {
		const email = values.contacts.email.trim() || original.contacts.email;
		const phone = values.contacts.phone?.trim() || original.contacts.phone;

		const hasWhatsApp =
			values.contacts.hasWhatsApp ?? original.contacts.hasWhatsApp ?? false;

		const isPhoneWpp =
			values.contacts.isPhoneWpp ?? original.contacts.isPhoneWpp ?? false;

		const whatsapp = !hasWhatsApp
			? null
			: isPhoneWpp
				? (phone ?? null)
				: values.contacts.whatsapp?.trim() ||
					original.contacts.whatsapp ||
					null;

		data.contacts = {
			email,
			phone: phone ?? null,
			whatsapp,

			hasWhatsApp,
			isPhoneWpp: hasWhatsApp ? isPhoneWpp : false,
		};
	}

	return { userId, data };
};
