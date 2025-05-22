// import { BlankPage } from '@psycron/pages/blank/BlankPage';

import { GenerateAvailability } from '@psycron/pages/availability/GenerateAvailability';
import { Dashboard } from '@psycron/pages/dashboard/Dashboard';
import {
	ADDPATIENT,
	APPOINTMENTS,
	AVAILABILITY,
	AVAILABILITYGENERATE,
	AVAILABILITYWIZARD,
	CHANGEPASSWORD,
	DASHBOARD,
	EDITUSER,
	EDITUSERBYSESSION,
} from '@psycron/pages/urls';
import { AddPatient } from '@psycron/pages/user/appointment/add-patient/AddPatient';
import { AppointmentPage } from '@psycron/pages/user/appointment/Appointment';
import { CancelAppointment } from '@psycron/pages/user/appointment/cancel/CancelAppointment';
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
	{ path: APPOINTMENTS, element: <AppointmentPage /> },
	{ path: AVAILABILITYWIZARD, element: <AvailabilityWizard /> },
	{ path: AVAILABILITYGENERATE, element: <GenerateAvailability /> },
	{ path: AVAILABILITY, element: <SetAvailabilityPage /> },
	{ path: `${APPOINTMENTS}/cancel/:patientId`, element: <CancelAppointment /> },
	{ path: ADDPATIENT, element: <AddPatient /> },
	// { path: 'blank', element: <BlankPage /> },
];

export default privateRoutes;
