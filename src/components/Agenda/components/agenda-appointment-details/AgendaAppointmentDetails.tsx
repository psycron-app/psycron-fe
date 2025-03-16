import { useEffect, useState } from 'react';
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
	appointmentDetails,
	handleEditAppointment,
}: IAgendaAppointmentDetails) => {
	console.log('🚀 ~ appointmentDetails:', appointmentDetails);
	const { t } = useTranslation();
	const { userDetails } = useUserDetails();
	const [patientId, setPatientId] = useState<string | null>();
	const { patientDetails } = usePatient(patientId);

	const { locale } = useParams<{
		locale: string;
	}>();

	useEffect(() => {
		if (appointmentDetails?.appointment?.patient?._id) {
			setPatientId(appointmentDetails.appointment.patient._id);
		} else {
			setPatientId(null);
		}
	}, [appointmentDetails]);

	if (!appointmentDetails?.appointment) {
		return <Loader />;
	}

	const { appointment } = appointmentDetails;

	const { firstName: therapistFirstName, lastName: therapistLastName } =
		userDetails;

	const therapistName = `${therapistFirstName} ${therapistLastName}`;

	const { date, startTime, endTime, patient } = appointment;
	console.log('🚀 ~ date:', date);

	const patientFirstName = patientDetails?.firstName || '';
	const patientLastName = patientDetails?.lastName || '';
	const contacts = patientDetails?.contacts || null;

	const patientName = patient && `${patientFirstName} ${patientLastName}`;

	const { whatsapp, phone, email } = contacts || {};

	const formattedClickedSlot = formatDate(date, locale);

	const wppText = t('components.agenda.appointment-details.whatsapp-subject', {
		therapistName,
	});

	return (
		<StyledWrapper>
			<StyledPatientDetails hasPatient={!!patient}>
				<Box>
					<Box display='flex' justifyContent='center'>
						{patient ? (
							<>
								<Text fontWeight={600} pr={1}>
									{t('globals.patient')}:
								</Text>
								<Text>{patientName}</Text>
							</>
						) : (
							<Text fontWeight={600} pb={4}>
								{'SLOT IS STILL AVAILABLE'}
							</Text>
						)}
					</Box>
					{patientDetails?.contacts ? (
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
					) : null}
				</Box>
				<Box display='flex'>
					<Text pr={1} fontWeight={600}>
						{t('globals.date')}:
					</Text>
					<Text isFirstUpper>{formattedClickedSlot}</Text>
				</Box>
				<Text fontWeight={600}>
					{t('globals.starts')}: {startTime}
				</Text>
				<Text fontWeight={600}>
					{t('globals.ends')}: {endTime}
				</Text>
			</StyledPatientDetails>
			{patient ? (
				<StyledSessionDatesList>
					<StyledSessionDatesTitle>
						{t('components.agenda.appointment-details.next-sessions')}:
					</StyledSessionDatesTitle>
					<Box>
						{/* {sortedSessions && sortedSessions.length > 0 ? (
						<Box>
							{futureSessions.map((session) => (
								<Box key={session._id} py={2} display='flex'>
									<Text fontWeight={500} pr={1} fontSize={'0.9rem'}>
										{t('globals.date')}:
									</Text>
									<Tooltip title={t('globals.edit')} arrow placement='right'>
										<StyledNextSessionText
											onClick={() =>
												handleEditAppointment(
													selectedSlot.availabilityDayId,
													selectedSlot.slot._id
												)
											}
										>
											{` ${formatDate(session.date, locale)} ${t('globals.at')} ${session.slots[0].startTime} h`}
										</StyledNextSessionText>
									</Tooltip>
								</Box>
							))}
						</Box>
					) : null} */}
					</Box>
				</StyledSessionDatesList>
			) : null}
		</StyledWrapper>
	);
};
