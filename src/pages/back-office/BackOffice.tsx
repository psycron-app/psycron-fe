import { Link } from '@psycron/components/link/Link';
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
	const { worker } = useWorker();

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
