/**
 * Auth Error Handling
 *
 * Prevents user enumeration by mapping all authentication errors
 * to generic messages that don't reveal system state.
 *
 * SECURITY: Never reveal whether an email exists in the system.
 * All login/signup/reset errors should use generic messages.
 */

import type { CustomError } from '@psycron/api/error';

/**
 * Error codes that indicate authentication-related issues.
 * These should all be mapped to generic messages.
 */
const AUTH_ERROR_CODES = [400, 401, 403, 404, 409, 422] as const;

/**
 * Generic error messages for auth flows.
 * Translation keys that don't reveal specific system state.
 */
export const AUTH_ERROR_MESSAGES = {
	// Login errors - never reveal if email exists
	LOGIN: 'auth.error.login-failed',
	// Registration errors - never reveal if email is taken
	REGISTER: 'auth.error.registration-failed',
	// Password reset request - always show same message
	PASSWORD_RESET_REQUEST: 'auth.error.password-reset-request',
	// Password reset confirmation
	PASSWORD_RESET: 'auth.error.password-reset-failed',
	// Session/token errors
	SESSION: 'auth.error.session-expired',
	// Rate limited
	RATE_LIMITED: 'auth.error.rate-limited',
	// Generic fallback
	GENERIC: 'auth.error.generic',
} as const;

export type AuthErrorType = keyof typeof AUTH_ERROR_MESSAGES;

/**
 * Determines if an error is auth-related based on the endpoint URL
 */
const isAuthEndpoint = (url?: string): boolean => {
	if (!url) return false;
	const authPaths = [
		'/users/login',
		'/users/register',
		'/users/logout',
		'/users/session',
		'/users/request-password-reset',
		'/users/password-reset',
		'/token/refresh-token',
	];
	return authPaths.some((path) => url.includes(path));
};

/**
 * Maps an error to the appropriate auth error type based on the request URL
 */
const getAuthErrorType = (url?: string): AuthErrorType => {
	if (!url) return 'GENERIC';

	if (url.includes('/users/login')) return 'LOGIN';
	if (url.includes('/users/register')) return 'REGISTER';
	if (url.includes('/users/request-password-reset'))
		return 'PASSWORD_RESET_REQUEST';
	if (url.includes('/users/password-reset')) return 'PASSWORD_RESET';
	if (url.includes('/users/session') || url.includes('/token/refresh-token'))
		return 'SESSION';

	return 'GENERIC';
};

/**
 * Sanitizes auth errors to prevent user enumeration.
 *
 * @param error - The original error from the API
 * @param requestUrl - The URL that was requested
 * @returns A sanitized error with generic message
 *
 * @example
 * // Backend returns: "Email not found"
 * // Sanitized to: "Invalid email or password"
 */
export const sanitizeAuthError = (
	error: CustomError,
	requestUrl?: string
): CustomError => {
	// Handle rate limiting specially - users should know they're rate limited
	if (error.statusCode === 429) {
		return {
			...error,
			message: AUTH_ERROR_MESSAGES.RATE_LIMITED,
		};
	}

	// Only sanitize auth endpoint errors
	if (!isAuthEndpoint(requestUrl)) {
		return error;
	}

	// For auth endpoints with error codes, use generic messages
	if (AUTH_ERROR_CODES.includes(error.statusCode as (typeof AUTH_ERROR_CODES)[number])) {
		const errorType = getAuthErrorType(requestUrl);
		return {
			...error,
			message: AUTH_ERROR_MESSAGES[errorType],
		};
	}

	return error;
};

/**
 * Success messages for auth operations.
 * These are safe to show as they don't reveal system state.
 */
export const AUTH_SUCCESS_MESSAGES = {
	// Password reset request - same message regardless of email existence
	PASSWORD_RESET_REQUEST: 'auth.success.password-reset-request',
	// Password changed successfully
	PASSWORD_RESET: 'auth.success.password-reset',
	// Logout successful
	LOGOUT: 'auth.success.logout',
} as const;
