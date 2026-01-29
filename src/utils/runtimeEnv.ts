type RuntimeEnv = 'test' | 'app';

export const getRuntimeEnv = (): RuntimeEnv => {
	const forced = import.meta.env.VITE_RUNTIME_ENV as RuntimeEnv | undefined;

	if (forced) return forced;

	const host = window.location.hostname.toLowerCase();
	if (host.startsWith('test.')) return 'test';
	return 'app';
};

export const isTestEnv = (): boolean => getRuntimeEnv() === 'test';
