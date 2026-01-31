import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import i18n from '@psycron/i18n';
import { isTestEnv } from '@psycron/utils/runtimeEnv';
import { PSYCRON_HOST } from '@psycron/utils/variables';

export const RootRedirect = () => {
	const locale = i18n.resolvedLanguage ?? 'en';

	useEffect(() => {
		if (!isTestEnv()) return;

		const host = window.location.hostname.toLowerCase();

		if (!host.startsWith('test.')) {
			const target = `${window.location.protocol}//${PSYCRON_HOST}/${locale}`;
			window.location.assign(target);
		}
	}, [locale]);

	return <Navigate to={`/${locale}`} replace />;
};
