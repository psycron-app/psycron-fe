import { Backoffice } from '@psycron/pages/back-office/BackOffice';
import { BACKOFFICE } from '@psycron/pages/urls';

const workerRoutes = [
	{
		path: BACKOFFICE,
		element: <Backoffice />,
	},
];

export default workerRoutes;
