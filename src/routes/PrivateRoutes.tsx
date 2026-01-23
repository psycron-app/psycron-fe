import { GenerateAvailability } from '@psycron/pages/availability/GenerateAvailability';
import { Dashboard } from '@psycron/pages/dashboard/Dashboard';
import {
	ADDPATIENT,
	APPOINTMENTS,
	AVAILABILITY,
	AVAILABILITYGENERATE,
	CHANGEPASSWORD,
	DASHBOARD,
	EDITUSER,
	EDITUSERBYSESSION,
	USERDETAILS,
} from '@psycron/pages/urls';
import { AddPatient } from '@psycron/pages/user/appointment/add-patient/AddPatient';
import { AppointmentPage } from '@psycron/pages/user/appointment/Appointment';
import { CancelAppointment } from '@psycron/pages/user/appointment/cancel/CancelAppointment';
import { UserDetailsPage } from '@psycron/pages/user/details/UserDetailsPage';
import { EditPassword } from '@psycron/pages/user/edit-password/EditPassword';
import { EditUser } from '@psycron/pages/user/edit-user/EditUser';
import { SetAvailabilityPage } from '@psycron/pages/user/set-availability/SetAvailabilityPage';

const privateRoutes = [
	{
		path: DASHBOARD,
		element: <Dashboard />,
	},
	{ path: USERDETAILS, element: <UserDetailsPage /> },
	{ path: EDITUSER, element: <EditUser /> },
	{ path: EDITUSERBYSESSION, element: <EditUser /> },
	{ path: CHANGEPASSWORD, element: <EditPassword /> },
	{ path: APPOINTMENTS, element: <AppointmentPage /> },
	{ path: AVAILABILITYGENERATE, element: <GenerateAvailability /> },
	{ path: AVAILABILITY, element: <SetAvailabilityPage /> },
	{ path: `${APPOINTMENTS}/cancel/:patientId`, element: <CancelAppointment /> },
	{ path: ADDPATIENT, element: <AddPatient /> },
];

export default privateRoutes;
