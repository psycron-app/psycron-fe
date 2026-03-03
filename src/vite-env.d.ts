/// <reference types="vite/client" />

/**
 * Type definitions for Vite environment variables.
 * These are exposed to the browser - never include secrets here.
 */
interface ImportMetaEnv {
	/** Is development mode */
	readonly DEV: boolean;

	/** Vite mode (development, production, etc.) */
	readonly MODE: string;

	/** Is production mode */
	readonly PROD: boolean;

	/** Backend API URL (required) */
	readonly VITE_PSYCRON_BASE_API_URL: string;

	/** Host used when redirecting into the testing area */
	readonly VITE_PSYCRON_BASE_URL?: string;

	/** Runtime environment for analytics/error monitoring */
	readonly VITE_RUNTIME_ENV?: 'dev' | 'staging' | 'prod';

	/** Optional test-mode override: true/false, 1/0, test/app */
	readonly VITE_TEST_MODE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
