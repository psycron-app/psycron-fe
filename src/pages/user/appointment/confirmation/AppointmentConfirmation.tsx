import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { Link } from '@psycron/components/link/Link';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { formatSessionDateToLocale } from '@psycron/utils/variables';

import {
	ConfirmationPageWrapper,
	StrongText,
	StyledSubTitle,
	StyledTitle,
} from './AppointmentConfirmation.styled';

export const AppointmentConfirmation = () => {
	const { patientId, locale } = useParams<{
		locale: string;
		patientId: string;
	}>();

	const { t } = useTranslation();

	const { patientDetails, isPatientDetailsLoading } = usePatient(patientId);

	const { userDetails, isUserDetailsLoading } = useUserDetails(
		String(patientDetails?.createdBy)
	);

	const latestSession = useMemo(() => {
		if (
			!patientDetails?.sessionDates ||
			patientDetails?.sessionDates.length === 0
		) {
			return;
		}

		return patientDetails?.sessionDates[
			patientDetails?.sessionDates.length - 1
		];
	}, [patientDetails]);

	if (isPatientDetailsLoading || isUserDetailsLoading) {
		return <Loader />;
	}

	const { firstName, lastName } = userDetails;

	const formattedSelectedSession = formatSessionDateToLocale(
		latestSession.sessions[0].date.toLocaleString(),
		locale
	);

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
			<Paper>
				<Box
					p={5}
					display='flex'
					flexDirection='column'
					justifyContent='center'
				>
					<Box display='flex' flexDirection='row' justifyContent='center'>
						<Text>{t('globals.date-time')}</Text>
						<Text pl={1} isFirstUpper>
							{formattedSelectedSession}
						</Text>
					</Box>
					<Text variant='caption' pt={2}>
						{t('page.booking-confirmation.advise')}
					</Text>
				</Box>
			</Paper>
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
									{' '}
								</Link>
							),
						}}
					/>
				</Text>
			</Box>
		</ConfirmationPageWrapper>
	);
};
