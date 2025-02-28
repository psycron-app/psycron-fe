import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Tooltip } from '@mui/material';
import { ContactLink } from '@psycron/components/link/contact/ContactLink';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { formatDate } from '@psycron/utils/variables';

import {
	StyledNextSessionText,
	StyledPatientDetails,
	StyledSessionDatesList,
	StyledSessionDatesTitle,
	StyledWrapper,
} from './AgendaAppointmentDetails.styles';
import type { IAgendaAppointmentDetails } from './AgendaAppointmentDetails.types';

export const AgendaAppointmentDetails = ({
	selectedSlotId,
	handleEditAppointment,
}: IAgendaAppointmentDetails) => {
	const { t } = useTranslation();

	const { locale } = useParams<{
		locale: string;
	}>();

	const {
		appointmentDetailsBySlotId,
		isAppointmentDetailsBySlotIdLoading,
		isUserDetailsLoading,
		userDetails,
	} = useUserDetails('', selectedSlotId);

	const { patientDetails, isPatientDetailsLoading, updatePatientIsLoading } =
		usePatient(appointmentDetailsBySlotId?.appointment?.patient?._id);

	if (
		isAppointmentDetailsBySlotIdLoading ||
		!appointmentDetailsBySlotId?.appointment ||
		isUserDetailsLoading ||
		isPatientDetailsLoading ||
		updatePatientIsLoading
	) {
		return <Loader />;
	}

	const { firstName: therapistFirstName, lastName: therapistLastName } =
		userDetails;

	const therapistName = `${therapistFirstName} ${therapistLastName}`;

	const {
		patient: {
			firstName,
			lastName,
			contacts: { whatsapp, phone, email },
		},
		date,
		startTime,
		endTime,
	} = appointmentDetailsBySlotId.appointment;

	const patientName = `${firstName} ${lastName}`;
	const formattedClickedSlot = formatDate(date, locale);

	const { sessionDates } = patientDetails;

	const latestSessionDate = sessionDates?.slice(-1)[0];

	const sortedSessions = latestSessionDate?.sessions.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	const today = new Date();

	const futureSessions = sortedSessions?.filter(
		(session) =>
			new Date(session.date).setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0)
	);

	const wppText = t('components.agenda.appointment-details.whatsapp-subject', {
		therapistName,
	});

	return (
		<StyledWrapper>
			<StyledPatientDetails>
				<Box>
					<Box display='flex'>
						<Text fontWeight={600} pr={1}>
							{t('globals.patient')}:
						</Text>
						<Text>{patientName}</Text>
					</Box>
					<Box px={1} py={2}>
						<Text fontWeight={600}>{t('globals.whatsapp')}:</Text>
						<ContactLink
							type='whatsapp'
							value={whatsapp}
							message={wppText}
							tooltip={t('globals.notification.whatsapp')}
						/>

						<Text fontWeight={600}>{t('globals.phone')}:</Text>
						<ContactLink
							type='phone'
							value={phone}
							tooltip={t('globals.notification.phone')}
						/>
						<Text fontWeight={600}>{t('globals.email')}:</Text>
						<ContactLink
							type='email'
							value={email}
							message={t(
								'components.agenda.appointment-details.mailto-subject',
								{
									therapistName,
								}
							)}
							tooltip={t('globals.notification.email')}
						/>
					</Box>
				</Box>
				<Box display='flex'>
					<Text pr={1} fontWeight={600}>
						{t('globals.date')}:
					</Text>
					<Text isFirstUpper fontWeight={600}>
						{formattedClickedSlot}
					</Text>
				</Box>
				<Text fontWeight={600}>
					{t('globals.starts')}: {startTime}
				</Text>
				<Text fontWeight={600}>
					{t('globals.ends')}: {endTime}
				</Text>
			</StyledPatientDetails>
			<StyledSessionDatesList>
				<StyledSessionDatesTitle>
					{t('components.agenda.appointment-details.next-sessions')}:
				</StyledSessionDatesTitle>
				<Box>
					{sortedSessions && sortedSessions.length > 0 ? (
						<Box>
							{futureSessions.map((session) => (
								<Box key={session._id} py={2} display='flex'>
									<Text fontWeight={500} pr={1} fontSize={'0.9rem'}>
										{t('globals.date')}:
									</Text>
									<Tooltip title={t('globals.edit')} arrow placement='right'>
										<StyledNextSessionText
											onClick={() =>
												handleEditAppointment(session.slots[0]._id)
											}
										>
											{` ${formatDate(session.date, locale)} ${t('globals.at')} ${session.slots[0].startTime} h`}
										</StyledNextSessionText>
									</Tooltip>
								</Box>
							))}
						</Box>
					) : null}
				</Box>
			</StyledSessionDatesList>
		</StyledWrapper>
	);
};
