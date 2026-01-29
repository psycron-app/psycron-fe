import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useWorkerAuth } from '@psycron/context/worker/auth/WorkerAuthProvider';

type RouteParams = { locale?: string };

export const WorkerGuard: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const { locale } = useParams<RouteParams>();
	const { isAuthenticated } = useWorkerAuth();

	if (!isAuthenticated) {
		return <Navigate to={`/${locale ?? 'en'}`} replace />;
	}

	return <>{children}</>;
};
