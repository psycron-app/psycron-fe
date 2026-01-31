import { PSYCRON_BASE_API } from '@psycron/utils/variables';
import axios from 'axios';

type RefreshWorkerTokenResponse = {
	accessToken: string;
	refreshToken: string;
};

type RefreshWorkerTokenPayload = {
	refreshToken: string;
};

export const refreshWorkerTokenService = async (
	refreshToken: string
): Promise<RefreshWorkerTokenResponse> => {
	const response = await axios.post<RefreshWorkerTokenResponse>(
		`${PSYCRON_BASE_API}/auth/worker/refresh`,
		{ refreshToken } satisfies RefreshWorkerTokenPayload,
		{ headers: { 'Content-Type': 'application/json' }, withCredentials: true }
	);

	return response.data;
};
