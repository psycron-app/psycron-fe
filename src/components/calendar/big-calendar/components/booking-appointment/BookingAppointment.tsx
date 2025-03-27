import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { Divider } from '@psycron/components/divider/Divider';
import { ContactsForm } from '@psycron/components/form/components/contacts/ContactsForm';
import { NameForm } from '@psycron/components/form/components/name/NameForm';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { getFormattedContacts } from '@psycron/hooks/useFormattedContacts';
import useViewport from '@psycron/hooks/useViewport';
import type { ICreatePatientForm } from '@psycron/pages/user/appointment/add-patient/AddPatient.types';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { enGB, ptBR } from 'date-fns/locale';

import { getFormattedTimeLabels } from '../appointment-details/utils';

import {
	BookingHour,
	BookingHourWrapper,
	SwitchingBoxes,
} from './BookingAppointment.styles';
import type {
	IBookingAppointment,
	IBookingAppointmentRef,
} from './BookingAppointment.types';

export const BookingAppointment = forwardRef<
	IBookingAppointmentRef,
	IBookingAppointment
>(({ selectedSlot }, ref) => {
	const { t } = useTranslation();
	const { locale, userId } = useParams();
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const { isSmallerThanTablet } = useViewport();

	const {
		availabilityDayId,
		date,
		slot: { startTime, endTime, _id: slotId },
	} = selectedSlot;

	console.log('🚀 ~ selectedSlot:', selectedSlot);

	const methods = useForm<ICreatePatientForm>();
	const { handleSubmit } = methods;
	const { userDetails } = useUserDetails(userId);
	const { bookAppointmentWithLink } = usePatient();

	const [shouldReplicate, setShouldReplicate] = useState<boolean>(false);

	const patientTimeZoneFromBrowser =
		Intl.DateTimeFormat().resolvedOptions().timeZone;

	const onSubmit = (formData: ICreatePatientForm) => {
		const { email, firstName, lastName } = formData;
		const { fullPhone, fullWhatsapp } = getFormattedContacts(formData);

		const appointmentData = {
			therapistId: userId,
			data: {
				availabilityDayId,
				slotId,
				patient: {
					firstName,
					lastName,
					contacts: {
						email,
						phone: fullPhone,
						...(fullWhatsapp ? { whatsapp: fullWhatsapp } : {}),
					},
				},
				timeZone: patientTimeZoneFromBrowser,
				shouldReplicate,
			},
		};

		bookAppointmentWithLink(appointmentData);
	};

	useImperativeHandle(ref, () => ({
		submitForm: () => handleSubmit(onSubmit)(),
	}));

	const { therapistLabel, patientLabel } = getFormattedTimeLabels(
		date,
		startTime,
		endTime,
		dateLocale,
		userDetails?.timeZone,
		patientTimeZoneFromBrowser,
		t,
		'patient'
	);

	const recurrencePatternSelection = [
		{ label: 'End of the Month', value: 'endMonth' },
		{ label: 'End of the Year', value: 'endYear' },
	];

	return (
		<Box>
			<BookingHourWrapper>
				<BookingHour pb={spacing.small}>{patientLabel}</BookingHour>
				<BookingHour>{therapistLabel}</BookingHour>
			</BookingHourWrapper>
			<FormProvider {...methods}>
				<Box component='form'>
					<Grid size={12}>
						<NameForm required />
						<ContactsForm required />
					</Grid>
				</Box>
				<Divider />
				<SwitchingBoxes>
					<Switch
						small={isSmallerThanTablet}
						label={t('page.book-appointment.confirmation-should-replicate')}
						value={shouldReplicate}
						defaultChecked={shouldReplicate}
						onChange={() => setShouldReplicate((prev) => !prev)}
					/>
					{shouldReplicate ? (
						<Box>
							<RadioButtonGroup
								items={recurrencePatternSelection}
								name='replicatePattern'
							/>
						</Box>
					) : null}
				</SwitchingBoxes>
			</FormProvider>
		</Box>
	);
});

BookingAppointment.displayName = 'BookingAppointment';
