import { CalendarPage } from '@psycron/pages/calendar/CalendarPage';
import { Dashboard } from '@psycron/pages/dashboard/Dashboard';
import {
	AVAILABILITY,
	CHANGEPASSWORD,
	DASHBOARD,
	EDITUSER,
	EDITUSERBYSESSION,
} from '@psycron/pages/urls';
import { EditPassword } from '@psycron/pages/user/edit-password/EditPassword';
import { EditUser } from '@psycron/pages/user/edit-user/EditUser';

const privateRoutes = [
	{
		path: DASHBOARD,
		element: <Dashboard />,
	},
	{ path: EDITUSER, element: <EditUser /> },
	{ path: EDITUSERBYSESSION, element: <EditUser /> },
	{ path: CHANGEPASSWORD, element: <EditPassword /> },
	{ path: AVAILABILITY, element: <CalendarPage /> },
];

export default privateRoutes;
