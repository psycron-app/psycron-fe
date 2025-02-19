import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ContactLink } from '@psycron/components/link/contact/ContactLink';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';

import type { IAgendaAppointmentDetails } from './AgendaAppointmentDetails.types';

export const AgendaAppointmentDetails = ({
	selectedSlotId,
}: IAgendaAppointmentDetails) => {
	const { t } = useTranslation();

	const {
		appointmentDetailsBySlotId,
		isAppointmentDetailsBySlotIdLoading,
		isUserDetailsLoading,
		userDetails,
	} = useUserDetails('', selectedSlotId);

	if (
		isAppointmentDetailsBySlotIdLoading ||
		!appointmentDetailsBySlotId?.appointment ||
		isUserDetailsLoading
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
		startTime,
		endTime,
	} = appointmentDetailsBySlotId.appointment;

	const wppText = t('components.agenda.appointment-details.whatsapp-subject', {
		therapistName,
	});

	return (
		<Box>
			<Box>
				<Text>
					{t('globals.patient')}: {firstName} {lastName}
				</Text>

				<Box px={1} py={2}>
					<Text display='flex'>{t('globals.whatsapp')}:</Text>
					<ContactLink
						type='whatsapp'
						value={whatsapp}
						message={wppText}
						tooltip={t('globals.notification.whatsapp')}
					/>

					<Text display='flex'>{t('globals.phone')}:</Text>
					<ContactLink
						type='phone'
						value={phone}
						tooltip={t('globals.notification.phone')}
					/>
					<Text display='flex'>{t('globals.email')}:</Text>
					<ContactLink
						type='email'
						value={email}
						message={t('components.agenda.appointment-details.mailto-subject', {
							therapistName,
						})}
						tooltip={t('globals.notification.email')}
					/>
				</Box>
			</Box>
			<Text>
				{t('globals.starts')}: {startTime}
			</Text>
			<Text>
				{t('globals.ends')}: {endTime}
			</Text>
		</Box>
	);
};
