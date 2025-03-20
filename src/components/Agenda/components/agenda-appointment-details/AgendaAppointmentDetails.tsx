import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import type { SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/material';
import { ContactLink } from '@psycron/components/link/contact/ContactLink';
import { Loader } from '@psycron/components/loader/Loader';
import { Select } from '@psycron/components/select/Select';
import { Text } from '@psycron/components/text/Text';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useTranslatedStatus } from '@psycron/hooks/useTranslatedStatus';
import { formatDate } from '@psycron/utils/variables';

import {
	// StyledNextSessionText,
	StyledPatientDetails,
	StyledSessionDatesList,
	StyledSessionDatesTitle,
	StyledWrapper,
} from './AgendaAppointmentDetails.styles';
import type { IAgendaAppointmentDetails } from './AgendaAppointmentDetails.types';

export const AgendaAppointmentDetails = ({
	appointmentDetails,
	handleEditAppointment,
	isEditingStatus,
	register,
	getValues,
	setValue,
}: IAgendaAppointmentDetails) => {
	const { t } = useTranslation();
	const { locale } = useParams<{
		locale: string;
	}>();

	const { userDetails } = useUserDetails();

	const statusOptions = useTranslatedStatus([
		'ONHOLD',
		'BLOCKED',
		'BOOKED',
		'CANCELLED',
	]);

	const translatedStatusValue =
		statusOptions.find(
			(option) => option.name === appointmentDetails?.slot?.status
		)?.value ?? '';

	const [selectedStatus, setSelectedStatus] = useState<string>(
		getValues('status') || translatedStatusValue
	);

	const handleStatusChange = (event: SelectChangeEvent<string>) => {
		const newStatus = event.target.value as ISlotStatus;
		setSelectedStatus(newStatus);
		setValue('status', newStatus);
	};
	const { appointmentDetailsBySlotId, isAppointmentDetailsBySlotIdLoading } =
		useAvailability(undefined, appointmentDetails);

	const patientId =
		appointmentDetailsBySlotId?.appointment?.patient?._id ?? null;

	const { patientDetails } = usePatient(patientId);

	if (isAppointmentDetailsBySlotIdLoading) {
		return <Loader />;
	}

	const { firstName: therapistFirstName, lastName: therapistLastName } =
		userDetails;

	const therapistName = `${therapistFirstName} ${therapistLastName}`;

	const {
		slot: { startTime, endTime, status },
		date,
	} = appointmentDetails;

	const patient = appointmentDetailsBySlotId?.appointment?.patient;

	const patientFirstName = patientDetails?.firstName || '';
	const patientLastName = patientDetails?.lastName || '';
	const contacts = patientDetails?.contacts || null;

	const patientName = patient && `${patientFirstName} ${patientLastName}`;

	const { whatsapp, phone, email } = contacts || {};

	const formattedClickedSlot = formatDate(new Date(date), locale);

	const wppText = t('components.agenda.appointment-details.whatsapp-subject', {
		therapistName,
	});

	const displayTextFromStatus = (status: ISlotStatus) => {
		const text = {
			AVAILABLE: t('components.agenda.appointment-details.text-status', {
				status: t('page.availability.agenda.status.available'),
			}),
			BOOKED: t('components.agenda.appointment-details.text-status', {
				status: '',
			}),
			BLOCKED: t('components.agenda.appointment-details.text-status', {
				status: '',
			}),
			ONHOLD: t('components.agenda.appointment-details.text-status', {
				status: '',
			}),
			CANCELLED: t('components.agenda.appointment-details.text-status', {
				status: '',
			}),
			EMPTY: t('components.agenda.appointment-details.text-status', {
				status: t('page.availability.agenda.status.empty'),
			}),
		};

		return text[status];
	};

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
							!isEditingStatus && (
								<Text fontWeight={600} pb={4}>
									{displayTextFromStatus(status)}
								</Text>
							)
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
				{isEditingStatus ? (
					<Box pt={2}>
						<Select
							items={statusOptions}
							required
							selectLabel={t('globals.status')}
							{...register('status')}
							subtitle
							value={selectedStatus}
							onChangeSelect={handleStatusChange}
							fullWidth
							hidePrimaryValue
						/>
					</Box>
				) : null}
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
