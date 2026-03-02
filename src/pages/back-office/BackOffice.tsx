import { useEffect } from 'react';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import { Button } from '@psycron/components/button/Button';
import { Link } from '@psycron/components/link/Link';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { useWorker } from '@psycron/context/worker/WorkerProvider';
import { SIGNIN } from '@psycron/pages/urls';

import {
	BackOfficeContent,
	BackOfficeHeader,
	BackOfficeHeaderText,
	BackOfficeItem,
	BackOfficeItemRow,
	BackofficePageWrapper,
} from './BackOffice.styles';

export const Backoffice = () => {
	const { worker, isLoading, error, isAuthenticated, logout } = useWorker();

	useEffect(() => {
		if (!worker?._id) return;
		capture('backoffice home viewed', { worker_id_present: true });
	}, [worker?._id]);

	if (!isAuthenticated) {
		return (
			<Text>
				You are not signed in. <Link to={`${SIGNIN}`}>Go to sign in</Link>
			</Text>
		);
	}

	if (isLoading) return <Loader />;

	if (error || !worker) {
		return (
			<Text>
				Failed to load session.{' '}
				<Link
					to={`${SIGNIN}`}
					onClick={() => {
						capture('Worker failed to load at backoffice');
					}}
				>
					Sign in again
				</Link>
				<Button type='button' onClick={logout}>
					Clear session
				</Button>
			</Text>
		);
	}

	return (
		<BackofficePageWrapper>
			<BackOfficeHeader>
				<BackOfficeHeaderText>Hello {worker.firstName}!</BackOfficeHeaderText>
			</BackOfficeHeader>
			<BackOfficeContent>
				<BackOfficeItem>
					<BackOfficeItemRow>
						<Text>Please test our latest dev version</Text>
						<Link to={`${SIGNIN}`}>here</Link>
					</BackOfficeItemRow>
					<BackOfficeItemRow>
						<Text variant='subtitle2'>Add your comments</Text>
						<Link
							to={
								'https://psycron.atlassian.net/browse/PR-93?atlOrigin=eyJpIjoiOWNhODRhMWFkMGNkNDRkM2I3NDU0NDY1YjY4YTVkNDYiLCJwIjoiaiJ9'
							}
						>
							here
						</Link>
					</BackOfficeItemRow>
				</BackOfficeItem>
			</BackOfficeContent>
		</BackofficePageWrapper>
	);
};
