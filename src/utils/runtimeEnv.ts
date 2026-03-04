type RuntimeArea = 'test' | 'app';

const parseTestModeOverride = (value: string | undefined): RuntimeArea | null => {
	if (!value) return null;

	const normalized = value.trim().toLowerCase();
	if (normalized === 'test' || normalized === 'true' || normalized === '1') {
		return 'test';
	}
	if (normalized === 'app' || normalized === 'false' || normalized === '0') {
		return 'app';
	}

	return null;
};

export const getRuntimeEnv = (): RuntimeArea => {
	const host = window.location.hostname.toLowerCase();
	if (host.startsWith('test.')) return 'test';

	const forced = parseTestModeOverride(import.meta.env.VITE_TEST_MODE);
	if (forced !== null) return forced;

	return 'app';
};

export const isTestEnv = (): boolean => getRuntimeEnv() === 'test';
