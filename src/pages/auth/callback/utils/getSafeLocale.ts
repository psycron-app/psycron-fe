import i18n from '@psycron/i18n';

export const getSafeLocale = (value?: string): string => {
	// Keep this aligned with your supported locales
	const supported = new Set(['en', 'pt']);
	if (value && supported.has(value)) return value;

	const fromI18n = i18n.resolvedLanguage ?? i18n.language;
	if (fromI18n && supported.has(fromI18n)) return fromI18n;

	return 'en';
};
