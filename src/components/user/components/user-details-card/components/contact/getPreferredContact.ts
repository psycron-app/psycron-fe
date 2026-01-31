import type { PreferredContact } from './ContactSectionContent.types';

export const getPreferredContact = (
	whatsapp?: string | null,
	phone?: string | null
): PreferredContact => {
	const wa = whatsapp?.trim();
	if (wa) return { kind: 'whatsapp', value: wa };

	const ph = phone?.trim();
	if (ph) return { kind: 'phone', value: ph };

	return { kind: 'empty' };
};
