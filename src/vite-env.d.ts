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

	/** Google Analytics Measurement ID (optional) */
	readonly VITE_GA_MEASUREMENT_ID?: string;

	/** Google Maps API key (optional) */
	readonly VITE_GOOGLE_MAPS_API_KEY?: string;

	/** IP Geolocation API key (optional) */
	readonly VITE_IP_GEO_KEY?: string;

	/** Backend API URL (required) */
	readonly VITE_PSYCRON_BASE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
