import { AuthPage } from '@psycron/pages/auth';
import { ChangePassword } from '@psycron/pages/auth/password/ChangePassword';
import { ResetPassword } from '@psycron/pages/auth/password/ResetPassword';
import { Home } from '@psycron/pages/home/HomePage';
import { Testing } from '@psycron/pages/testing/indext';
import { Unsubscribe } from '@psycron/pages/unsubscribe/Unsubscribe';
import {
	APPOINTMENTCONFIRMATIONPATH,
	BOOKAPPOINTMENT,
	HOMEPAGE,
	PASSRESET,
	PATIENTAPPOINTMENTSLIST,
	PATIENTEDITAPPOINTMENT,
	REQPASSRESET,
	SIGNIN,
	SIGNUP,
	UNSUBSCRIBE,
} from '@psycron/pages/urls';
import { BookAppointment } from '@psycron/pages/user/appointment/booking/BookAppointment';
import { AppointmentConfirmation } from '@psycron/pages/user/appointment/confirmation/AppointmentConfirmation';
import { AppointmentsList } from '@psycron/pages/user/appointment/list/patient/AppointmentsList';

const publicRoutes = [
	{ path: HOMEPAGE, element: <Home /> },
	{ path: UNSUBSCRIBE, element: <Unsubscribe /> },
	{ path: SIGNIN, element: <AuthPage /> },
	{ path: SIGNUP, element: <AuthPage /> },
	{ path: REQPASSRESET, element: <ResetPassword /> },
	{ path: PASSRESET, element: <ChangePassword /> },
	{ path: BOOKAPPOINTMENT, element: <BookAppointment /> },
	{ path: APPOINTMENTCONFIRMATIONPATH, element: <AppointmentConfirmation /> },
	{ path: PATIENTAPPOINTMENTSLIST, element: <AppointmentsList /> },
	{
		path: `:userId/${PATIENTEDITAPPOINTMENT}/edit/:availabilityDayId`,
		element: <BookAppointment />,
	},
	{
		path: 'test',
		element: <Testing />,
	},
];

export default publicRoutes;
