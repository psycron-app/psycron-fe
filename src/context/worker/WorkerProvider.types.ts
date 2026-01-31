import type { IWorker } from '@psycron/api/worker/index.types';

export type WorkerContextValue = {
	error: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	logout: () => void;
	worker: IWorker | null;
};
