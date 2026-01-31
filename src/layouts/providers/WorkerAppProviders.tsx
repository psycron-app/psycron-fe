import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AlertProvider } from '@psycron/context/alert/AlertContext';
import { WorkerProvider } from '@psycron/context/worker/WorkerProvider';
import { AnalyticsTracker } from '@psycron/routes/AnalyticsTracker';
import { WorkerGuard } from '@psycron/routes/WorkerGuard';

export const WorkerAppProviders: FC = () => {
	return (
		<WorkerProvider>
			<WorkerGuard>
				<AlertProvider>
					<AnalyticsTracker />
					<Outlet />
				</AlertProvider>
			</WorkerGuard>
		</WorkerProvider>
	);
};
