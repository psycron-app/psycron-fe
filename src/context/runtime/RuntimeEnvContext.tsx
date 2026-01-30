import type { FC, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { isTestEnv } from '@psycron/utils/runtimeEnv';

type RuntimeEnvContextValue = {
	isTestingEnv: boolean;
};

const RuntimeEnvContext = createContext<RuntimeEnvContextValue | null>(null);

export const RuntimeEnvProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const value = useMemo<RuntimeEnvContextValue>(
		() => ({ isTestingEnv: isTestEnv() }),
		[]
	);

	return (
		<RuntimeEnvContext.Provider value={value}>
			{children}
		</RuntimeEnvContext.Provider>
	);
};

export const useRuntimeEnv = (): RuntimeEnvContextValue => {
	const ctx = useContext(RuntimeEnvContext);
	if (!ctx) {
		throw new Error('useRuntimeEnv must be used within RuntimeEnvProvider');
	}
	return ctx;
};
