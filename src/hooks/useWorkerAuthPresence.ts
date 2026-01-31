import { useEffect, useState } from 'react';
import { getWorkerAccessToken } from '@psycron/context/worker/utils/workerTokenStorage';

export const useWorkerAuthPresence = (): boolean => {
	const [hasWorkerAuth, setHasWorkerAuth] = useState<boolean>(() =>
		Boolean(getWorkerAccessToken())
	);

	useEffect(() => {
		const update = (): void => {
			setHasWorkerAuth(Boolean(getWorkerAccessToken()));
		};

		const onStorage = (e: StorageEvent): void => {
			if (!e.key) return;
			if (e.key.startsWith('_psyw_')) update();
		};

		window.addEventListener('storage', onStorage);

		window.addEventListener('psycron:worker-auth-changed', update);

		return () => {
			window.removeEventListener('storage', onStorage);
			window.removeEventListener('psycron:worker-auth-changed', update);
		};
	}, []);

	return hasWorkerAuth;
};
