import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import type { SelectChangeEvent } from '@mui/material';
import { Box, Grid } from '@mui/material';
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
import { enGB, ptBR } from 'date-fns/locale';

import {
	SessionListWrapper,
	StyledNextSessionHoverable,
	StyledNextSessionText,
	StyledPatientDetails,
	StyledSessionDatesList,
	StyledSessionDatesTitle,
	StyledWrapper,
} from './AppointmentDetails.styles';
import type { IAppointmentDetails } from './AppointmentDetails.types';
import { getFormattedTimeLabels } from './utils';

export const AppointmentDetails = ({
	appointmentDetails,
	handleEditAppointment,
	isEditingStatus,
}: IAppointmentDetails) => {
	const { t } = useTranslation();
	const { locale } = useParams<{
		locale: string;
	}>();
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const { register, getValues, setValue } = useFormContext();

	const { userDetails, therapistId } = useUserDetails();

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

	const slotPatientId = appointmentDetails?.slot?.patientId;
	const fallbackPatientId =
		appointmentDetailsBySlotId?.appointment?.patient?._id;
	const patientId = slotPatientId ?? fallbackPatientId;

	const { patientDetails } = usePatient(therapistId, patientId);

	const sortedSessions = useMemo(() => {
		if (!patientDetails?.sessionDates?.length) return [];

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		return [...patientDetails.sessionDates]
			.map((session) => {
				const sessionDate = new Date(session.date);
				const normalized = new Date(sessionDate);
				normalized.setHours(0, 0, 0, 0);

				return {
					...session,
					isToday: normalized.getTime() === today.getTime(),
					isPast: normalized.getTime() < today.getTime(),
				};
			})
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	}, [patientDetails?.sessionDates]);

	const patientName = useMemo(() => {
		if (!patientDetails) return '';
		return `${patientDetails.firstName} ${patientDetails.lastName}`;
	}, [patientDetails]);

	const { firstName: therapistFirstName, lastName: therapistLastName } =
		userDetails;

	const therapistName = `${therapistFirstName} ${therapistLastName}`;
	const { slot, date } = appointmentDetails;

	const { startTime, endTime, status } = slot;

	const { whatsapp, phone, email } = patientDetails?.contacts || {};

	const wppText = t('components.agenda.appointment-details.whatsapp-subject', {
		therapistName,
	});

	const displayTextFromStatus = (status: ISlotStatus) => {
		return t('components.agenda.appointment-details.text-status', {
			status: t(`page.availability.agenda.status.${status.toLowerCase()}`),
		});
	};

	const therapistTimeZone = userDetails?.timeZone;
	const patientTimeZone = patientDetails?.timeZone;

	const { therapistLabel, therapistTooltip, patientLabel, patientTooltip } =
		getFormattedTimeLabels(
			date,
			startTime,
			endTime,
			dateLocale,
			therapistTimeZone,
			patientTimeZone,
			t,
			'therapist'
		);

	if (isAppointmentDetailsBySlotIdLoading) {
		return <Loader />;
	}

	return (
		<StyledWrapper container columns={12}>
			<StyledPatientDetails container hasPatient={!!patientDetails} columns={6}>
				<Grid size={{ xs: 6 }} minHeight={patientDetails ? '12rem' : 'auto'}>
					{patientDetails ? (
						<Box display='flex'>
							<Text fontWeight={600} pr={1}>
								{t('globals.patient')}:
							</Text>
							<Text>{patientName}</Text>
						</Box>
					) : (
						<Box display='flex' justifyContent='center'>
							{!isEditingStatus && (
								<Text fontWeight={600} pb={4}>
									{displayTextFromStatus(status)}
								</Text>
							)}
						</Box>
					)}
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
				</Grid>
				{isEditingStatus ? (
					<Grid pt={2} size={{ xs: 12 }}>
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
					</Grid>
				) : null}
			</StyledPatientDetails>
			{patientDetails ? (
				<SessionListWrapper size={{ xs: 6 }}>
					<StyledSessionDatesTitle>
						{t('components.agenda.appointment-details.next-sessions')}:
					</StyledSessionDatesTitle>
					<StyledSessionDatesList>
						{sortedSessions ? (
							<>
								{sortedSessions.map((session) => {
									const { date, isPast, isToday, slots } = session;

									return (
										<Box
											key={session._id}
											py={2}
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
										>
											<StyledNextSessionHoverable
												title={
													isPast
														? t('page.appointment-list.session-past')
														: t('globals.edit')
												}
												arrow
												placement='right'
												disabled={isPast}
												onClick={
													!isPast
														? () => handleEditAppointment(appointmentDetails)
														: undefined
												}
											>
												<StyledNextSessionText
													isPast={isPast}
													isToday={isToday}
													isFirstUpper
												>
													{`${formatDate(new Date(date), locale)} ${t('globals.at')} ${slots[0].startTime} h`}
												</StyledNextSessionText>
											</StyledNextSessionHoverable>
										</Box>
									);
								})}
							</>
						) : null}
					</StyledSessionDatesList>
				</SessionListWrapper>
			) : null}
			<Grid
				display='flex'
				flexDirection='column'
				alignItems='flex-start'
				size={{ xs: 12 }}
			>
				<Text fontWeight={600}>{t('globals.date-time')}</Text>
				<Box>
					<StyledNextSessionHoverable title={therapistTooltip}>
						<Text isFirstUpper>{therapistLabel}</Text>
					</StyledNextSessionHoverable>
					{patientDetails ? (
						<StyledNextSessionHoverable title={patientTooltip}>
							<Text isFirstUpper>{patientLabel}</Text>
						</StyledNextSessionHoverable>
					) : null}
				</Box>
			</Grid>
		</StyledWrapper>
	);
};
