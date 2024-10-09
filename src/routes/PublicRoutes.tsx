import { AuthPage } from '@psycron/pages/auth';
import { ChangePassword } from '@psycron/pages/auth/password/ChangePassword';
import { ResetPassword } from '@psycron/pages/auth/password/ResetPassword';
import { Home } from '@psycron/pages/home';
import { Unsubscribe } from '@psycron/pages/unsubscribe/Unsubscribe';
import {
	APPOINTMENTCONFIRMATIONPATH,
	BOOKAPPOINTMENT,
	HOMEPAGE,
	PASSRESET,
	REQPASSRESET,
	SIGNIN,
	SIGNUP,
	UNSUBSCRIBE,
} from '@psycron/pages/urls';
import { AppointmentConfirmation } from '@psycron/pages/user/book-appointment/AppointmentConfirmation';
import { BookAppointment } from '@psycron/pages/user/book-appointment/BookAppointment';

const publicRoutes = [
	{ path: HOMEPAGE, element: <Home /> },
	{ path: UNSUBSCRIBE, element: <Unsubscribe /> },
	{ path: SIGNIN, element: <AuthPage /> },
	{ path: SIGNUP, element: <AuthPage /> },
	{ path: REQPASSRESET, element: <ResetPassword /> },
	{ path: PASSRESET, element: <ChangePassword /> },
	{ path: BOOKAPPOINTMENT, element: <BookAppointment /> },
	{ path: APPOINTMENTCONFIRMATIONPATH, element: <AppointmentConfirmation /> },
];

export default publicRoutes;
