import workerApiClient from './axios-worker-instance';
import type { IWorker, IWorkerMeResponse } from './index.types';

export const getWorkerMe = async (): Promise<IWorker> => {
	const response = await workerApiClient.get<IWorkerMeResponse>('/workers/me');
	return response.data.worker;
};
