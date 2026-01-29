import React, { createContext, useContext, useMemo, useState } from 'react';

import {
	clearWorkerTokens,
	getWorkerAccessToken,
} from './utils/workerTokenStorage';
import type { WorkerAuthContextValue } from './WorkerAuthProvider.types';

const WorkerAuthContext = createContext<WorkerAuthContextValue | null>(null);

export const WorkerAuthProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [version, setVersion] = useState(0);

	const isAuthenticated = useMemo(() => {
		void version;
		return Boolean(getWorkerAccessToken());
	}, [version]);

	const logout = (): void => {
		clearWorkerTokens();
		setVersion((v) => v + 1);
	};

	return (
		<WorkerAuthContext.Provider value={{ isAuthenticated, logout }}>
			{children}
		</WorkerAuthContext.Provider>
	);
};

export const useWorkerAuth = (): WorkerAuthContextValue => {
	const ctx = useContext(WorkerAuthContext);
	if (!ctx) {
		throw new Error('useWorkerAuth must be used within WorkerAuthProvider');
	}
	return ctx;
};
