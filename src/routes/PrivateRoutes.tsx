import { Dashboard } from '@psycron/pages/dashboard/Dashboard';
import {
	AVAILABILITY,
	AVAILABILITYWIZARD,
	CHANGEPASSWORD,
	DASHBOARD,
	EDITUSER,
	EDITUSERBYSESSION,
} from '@psycron/pages/urls';
import { AvailabilityWizard } from '@psycron/pages/user/availability-wizard/AvailabilityWizard';
import { EditPassword } from '@psycron/pages/user/edit-password/EditPassword';
import { EditUser } from '@psycron/pages/user/edit-user/EditUser';
import { SetAvailabilityPage } from '@psycron/pages/user/set-availability/SetAvailabilityPage';

const privateRoutes = [
	{
		path: DASHBOARD,
		element: <Dashboard />,
	},
	{ path: EDITUSER, element: <EditUser /> },
	{ path: EDITUSERBYSESSION, element: <EditUser /> },
	{ path: CHANGEPASSWORD, element: <EditPassword /> },
	{ path: AVAILABILITYWIZARD, element: <AvailabilityWizard /> },

	{ path: AVAILABILITY, element: <SetAvailabilityPage /> },
];

export default privateRoutes;
