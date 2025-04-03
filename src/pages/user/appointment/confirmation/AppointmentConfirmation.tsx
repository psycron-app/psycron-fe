import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import type { ISelectedSlot } from '@psycron/components/calendar/big-calendar/BigCalendar.types';
import { getFormattedTimeLabels } from '@psycron/components/calendar/big-calendar/components/appointment-details/utils';
import { Globe, MapPin } from '@psycron/components/icons';
import { Link } from '@psycron/components/link/Link';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { PATIENTEDITAPPOINTMENT } from '@psycron/pages/urls';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import {
	AppointmentItem,
	AppointmentItemWrapper,
	AppointmentsInfoWrapper,
	ConfirmationPageWrapper,
	StrongText,
	StyledSubTitle,
	StyledTitle,
} from './AppointmentConfirmation.styled';

export const AppointmentConfirmation = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { patientId, locale, therapistId } = useParams<{
		locale: string;
		patientId: string;
		therapistId: string;
	}>();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const { patientDetails, isPatientDetailsLoading } = usePatient(
		therapistId,
		patientId
	);

	const { userDetails, isUserDetailsLoading } = useUserDetails(
		String(patientDetails?.createdBy)
	);

	const patientTimeZoneFromBrowser =
		Intl.DateTimeFormat().resolvedOptions().timeZone;

	const formattedSessionDates = useMemo(() => {
		return patientDetails?.sessionDates?.flatMap(
			({ date, slots, _id: availabilityDayId }) =>
				slots.map(({ startTime, endTime, status, _id }) => {
					const { therapistLabel, patientLabel } = getFormattedTimeLabels(
						new Date(date),
						startTime,
						endTime,
						dateLocale,
						userDetails?.timeZone,
						patientTimeZoneFromBrowser,
						t,
						'patient'
					);

					return {
						date,
						availabilityDayId,
						slot: { _id, startTime, endTime, status },
						patientId: patientId,
						therapistLabel,
						patientLabel,
					};
				})
		);
	}, [
		patientDetails,
		dateLocale,
		userDetails?.timeZone,
		patientTimeZoneFromBrowser,
		t,
		patientId,
	]);

	if (
		isPatientDetailsLoading ||
		isUserDetailsLoading ||
		!patientDetails ||
		!userDetails
	) {
		return <Loader />;
	}

	const { firstName, lastName } = userDetails;

	const handleEditAppointment = (selectedSlot: ISelectedSlot) => {
		const {
			date,
			availabilityDayId,
			slot: { _id: slotId },
		} = selectedSlot;

		const formattedDate = format(date, 'yyyy-MM-dd');
		navigate(
			`../${therapistId}/${PATIENTEDITAPPOINTMENT}/edit/${availabilityDayId}?slot=${slotId}&date=${formattedDate}`
		);
	};

	return (
		<ConfirmationPageWrapper>
			<Box pb={5}>
				<StyledTitle variant='h2' display='flex' justifyContent='center'>
					<Trans
						i18nKey={'page.booking-confirmation.title'}
						values={{ therapistName: `${firstName} ${lastName}` }}
						components={{ strong: <StrongText /> }}
					/>
				</StyledTitle>
				<StyledSubTitle variant='h4' pt={3}>
					{t('page.booking-confirmation.subtitle')}
				</StyledSubTitle>
			</Box>
			<AppointmentsInfoWrapper>
				{formattedSessionDates?.map(
					(
						{ patientLabel, therapistLabel, date, availabilityDayId, slot },
						index
					) => {
						const selectedSlot: ISelectedSlot = {
							date: new Date(date),
							availabilityDayId,
							slot,
						};

						return (
							<AppointmentItemWrapper
								key={index}
								title={t('globals.edit')}
								placement='right'
								onClick={() => handleEditAppointment(selectedSlot)}
							>
								<Box>
									<AppointmentItem pb={1}>
										<MapPin />
										<Text variant='body1' fontWeight='medium' pl={1}>
											{patientLabel}
										</Text>
									</AppointmentItem>

									<AppointmentItem>
										<Globe />
										<Text variant='body1' fontWeight='medium' pl={1}>
											{therapistLabel}
										</Text>
									</AppointmentItem>
								</Box>
							</AppointmentItemWrapper>
						);
					}
				)}
				<Text variant='caption' pt={2}>
					{t('page.booking-confirmation.advise')}
				</Text>
			</AppointmentsInfoWrapper>
			<Box py={5}>
				<Text variant='subtitle2'>
					{t('page.booking-confirmation.reschedule')}
				</Text>
				<Text variant='subtitle2' display='flex' justifyContent='center'>
					<Trans
						i18nKey={'page.booking-confirmation.cancel'}
						components={{
							strong: (
								<Link to={`${patientDetails._id}/appointments`} replace>
									aa
								</Link>
							),
						}}
					/>
				</Text>
			</Box>
		</ConfirmationPageWrapper>
	);
};
