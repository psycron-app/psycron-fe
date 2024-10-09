// MAIN
export const DOMAIN = 'https://psycron.app';
export const HOMEPAGE = '';
export const LOCALISATION = ':locale';
export const BASE_API_URL = 'https://api.psycron.app/api/v1/';

// ID
export const USERID = ':userId';
export const PATIENTID = ':patientId';
export const APPOINTMENTID = ':appointmentId';

// PUBLIC
// AUTH
export const SIGNIN = 'sign-in';
export const SIGNUP = 'sign-up';
export const LOGOUT = 'logout';
export const REQPASSRESET = 'reset-password';
export const PASSRESET = 'password-reset/:token';

// UNSUBSCRIBE
export const UNSUBSCRIBE = ':token/unsubscribe';

// PRIVATE
export const DASHBOARD = 'dashboard';
// PRIVATE - USER
export const EDITUSERPATH = 'edit';
export const EDITUSER = `${EDITUSERPATH}/${USERID}`;
export const EDITUSERBYSESSION = `${EDITUSER}/:session`;
export const CHANGEPASSWORD = `${EDITUSER}/password`;

export const PATIENTS = 'patients';
export const PAYMENTS = 'payments';
export const APPOINTMENTS = 'appointments';
export const APPOINTMENTCONFIRMATION = 'appointment-confirmation';

export const AVAILABILITYPATH = 'availability';

export const AVAILABILITY = `${AVAILABILITYPATH}/${USERID}`;
export const AVAILABILITYWIZARD = `${AVAILABILITYPATH}/create`;
export const AGENDA = 'agenda';
export const BOOKAPPOINTMENT = `${USERID}/book-appointment/:first?`;
export const APPOINTMENTCONFIRMATIONPATH = `${PATIENTID}/${APPOINTMENTCONFIRMATION}`;
export const RESCHEDULEAPPOINTMENT = `${DOMAIN}/${APPOINTMENTID}/edit-appointment`;
