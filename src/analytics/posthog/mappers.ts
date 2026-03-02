import type { CustomError } from '@psycron/api/error';
import posthog from 'posthog-js';

import type { ExceptionContext } from './AppAnalytics.types';

export const toEditUserErrorCode = (error: CustomError): string => {
	const msg = String(error.message ?? '').toLowerCase();
	if (msg.includes('not-allowed') || msg.includes('forbidden'))
		return 'not_allowed';
	if (msg.includes('not-found')) return 'not_found';
	if (msg.includes('invalid')) return 'invalid';
	return 'unknown';
};

export const captureException = (
	error: unknown,
	context?: ExceptionContext
): void => {
	if (error instanceof Error) {
		posthog.captureException(error, {
			...context,
		});
		return;
	}

	posthog.capture('non_error_exception', {
		original: String(error),
		...context,
	});
};
