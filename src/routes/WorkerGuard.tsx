import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useWorker } from '@psycron/context/worker/WorkerProvider';

type RouteParams = { locale?: string };

export const WorkerGuard: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const { locale } = useParams<RouteParams>();
	const { isAuthenticated } = useWorker();

	if (!isAuthenticated) {
		return <Navigate to={`/${locale ?? 'en'}`} replace />;
	}

	return <>{children}</>;
};
