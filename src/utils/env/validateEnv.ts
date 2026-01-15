/**
 * Environment Variable Validation
 *
 * Validates required environment variables at application startup.
 * Catches misconfigurations early before they cause runtime errors.
 *
 * @module utils/env/validateEnv
 */

export interface EnvConfig {
	VITE_GA_MEASUREMENT_ID?: string;
	VITE_GOOGLE_MAPS_API_KEY?: string;
	VITE_IP_GEO_KEY?: string;
	VITE_PSYCRON_BASE_API_URL: string;
}

interface ValidationResult {
	errors: string[];
	isValid: boolean;
	warnings: string[];
}

/**
 * List of environment variables that should NEVER be in frontend code.
 * If detected, the application will refuse to start.
 */
const FORBIDDEN_ENV_VARS = [
	'VITE_JWT_SECRET',
	'VITE_DB_PASSWORD',
	'VITE_DB_CONNECTION_STRING',
	'VITE_PRIVATE_KEY',
	'VITE_SECRET_KEY',
	'VITE_API_SECRET',
	'VITE_ENCRYPTION_KEY',
] as const;

/**
 * Required environment variables that must be set for the app to function.
 */
const REQUIRED_ENV_VARS = ['VITE_PSYCRON_BASE_API_URL'] as const;

/**
 * Optional environment variables with feature descriptions.
 */
const OPTIONAL_ENV_VARS: Record<string, string> = {
	VITE_IP_GEO_KEY: 'IP Geolocation (timezone detection)',
	VITE_GOOGLE_MAPS_API_KEY: 'Google Maps (address autocomplete)',
	VITE_GA_MEASUREMENT_ID: 'Google Analytics (usage tracking)',
};

/**
 * Validates a URL format
 */
const isValidUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

/**
 * Checks if a value looks like a placeholder that wasn't replaced
 */
const isPlaceholder = (value: string): boolean => {
	const placeholderPatterns = [
		/^your_.*_here$/i,
		/^xxx+$/i,
		/^placeholder$/i,
		/^changeme$/i,
		/^todo$/i,
		/^<.*>$/,
		/^\[.*\]$/,
		/^\{.*\}$/,
	];
	return placeholderPatterns.some((pattern) => pattern.test(value));
};

/**
 * Validates all environment variables at startup.
 * Call this function in main.tsx before rendering the app.
 *
 * @throws {Error} If critical validation fails in production
 * @returns {ValidationResult} Validation results with errors and warnings
 */
export const validateEnv = (): ValidationResult => {
	const errors: string[] = [];
	const warnings: string[] = [];
	const isDev = import.meta.env.DEV;
	const mode = import.meta.env.MODE;

	// eslint-disable-next-line no-console
	console.info(`[ENV] Validating environment (mode: ${mode})`);

	// Check for forbidden secrets
	for (const forbidden of FORBIDDEN_ENV_VARS) {
		const value = import.meta.env[forbidden];
		if (value !== undefined && value !== '') {
			errors.push(
				`SECURITY VIOLATION: ${forbidden} should NEVER be in frontend code. ` +
					'This is a backend-only secret. Remove it from your .env file immediately.'
			);
		}
	}

	// Check required variables
	for (const required of REQUIRED_ENV_VARS) {
		const value = import.meta.env[required];
		if (!value) {
			errors.push(`Missing required environment variable: ${required}`);
		} else if (isPlaceholder(value)) {
			errors.push(
				`${required} contains a placeholder value. Please set a real value.`
			);
		}
	}

	// Validate API URL format
	const apiUrl = import.meta.env.VITE_PSYCRON_BASE_API_URL;
	if (apiUrl && !isValidUrl(apiUrl)) {
		errors.push(
			`VITE_PSYCRON_BASE_API_URL is not a valid URL: "${apiUrl}". ` +
				'Expected format: http(s)://domain/path'
		);
	}

	// Check for HTTP in production (should be HTTPS)
	if (!isDev && apiUrl && apiUrl.startsWith('http://')) {
		warnings.push(
			'VITE_PSYCRON_BASE_API_URL uses HTTP in production. Consider using HTTPS for security.'
		);
	}

	// Check optional variables and warn if missing
	for (const [varName, description] of Object.entries(OPTIONAL_ENV_VARS)) {
		const value = import.meta.env[varName];
		if (!value || isPlaceholder(value)) {
			warnings.push(`Optional: ${varName} not configured. Feature disabled: ${description}`);
		}
	}

	// Check for localhost in production
	if (!isDev && apiUrl && apiUrl.includes('localhost')) {
		errors.push(
			'VITE_PSYCRON_BASE_API_URL points to localhost in production mode. ' +
				'This is likely a misconfiguration.'
		);
	}

	// Log results
	/* eslint-disable no-console */
	if (errors.length > 0) {
		console.error('[ENV] Validation FAILED:');
		errors.forEach((err) => console.error(`  - ${err}`));
	}

	if (warnings.length > 0) {
		console.warn('[ENV] Validation warnings:');
		warnings.forEach((warn) => console.warn(`  - ${warn}`));
	}
	/* eslint-enable no-console */

	if (errors.length === 0) {
		// eslint-disable-next-line no-console
		console.info('[ENV] Validation passed');
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
};

/**
 * Gets the validated environment configuration.
 * Only call this after validateEnv() has passed.
 */
export const getEnvConfig = (): EnvConfig => {
	return {
		VITE_PSYCRON_BASE_API_URL: import.meta.env.VITE_PSYCRON_BASE_API_URL,
		VITE_IP_GEO_KEY: import.meta.env.VITE_IP_GEO_KEY,
		VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
	};
};

export default validateEnv;
