export type IWorker = {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	picture: string;
	timeZone: string;
};

export type IWorkerMeResponse = {
	role: 'WORKER';
	worker: IWorker;
};
