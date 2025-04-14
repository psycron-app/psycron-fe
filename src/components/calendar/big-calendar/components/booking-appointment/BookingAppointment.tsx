import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { Divider } from '@psycron/components/divider/Divider';
import { ContactsForm } from '@psycron/components/form/components/contacts/ContactsForm';
import { NameForm } from '@psycron/components/form/components/name/NameForm';
import { Loader } from '@psycron/components/loader/Loader';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import { Text } from '@psycron/components/text/Text';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useAppointmentParams } from '@psycron/hooks/useAppointmentParams';
import { getFormattedContacts } from '@psycron/hooks/useFormattedContacts';
import useViewport from '@psycron/hooks/useViewport';
import {
	type ICreatePatientForm,
	RecurrencePattern,
} from '@psycron/pages/user/appointment/add-patient/AddPatient.types';
import { format } from 'date-fns';
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

	const { locale, userId, mode, selectedSlotId } = useAppointmentParams();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const { isSmallerThanTablet } = useViewport();

	const {
		availabilityDayId,
		date,
		slot: { startTime, endTime, _id: slotId },
	} = selectedSlot;

	const methods = useForm<ICreatePatientForm>({
		mode: 'onChange',
	});

	const { handleSubmit } = methods;
	const { userDetails } = useUserDetails(userId);
	const { bookAppointmentWithLink, patientEditAppointment } = usePatient();

	const { publicSlotDetails, publicSlotDetailsIsLoading } = useAvailability(
		undefined,
		undefined,
		selectedSlotId ?? slotId
	);

	const [shouldReplicate, setShouldReplicate] = useState<boolean>(false);

	const patientTimeZoneFromBrowser =
		Intl.DateTimeFormat().resolvedOptions().timeZone;

	const onSubmit = (formData: ICreatePatientForm) => {
		const { email, firstName, lastName, recurrencePattern } = formData;
		const { fullPhone, fullWhatsapp } = getFormattedContacts(formData);

		if (mode === 'book') {
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
					recurrencePattern: shouldReplicate && recurrencePattern,
				},
			};

			bookAppointmentWithLink(appointmentData);
		} else {
			const editAppointmentData = {
				oldSlotId: selectedSlotId,
				newSlotId: selectedSlot.slot._id,
				availabilityDayId: selectedSlot.availabilityDayId,
				patientId: publicSlotDetails.patientId,
				therapistId: userId,
				recurrencePattern,
			};

			patientEditAppointment(editAppointmentData);
		}
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
		{
			label: t('page.book-appointment.recurrence-pattern.month'),
			value: RecurrencePattern.UNTIL_END_OF_MONTH,
		},
		{
			label: t('page.book-appointment.recurrence-pattern.year'),
			value: RecurrencePattern.UNTIL_END_OF_YEAR,
		},
	];

	const shouldRecurrencePattern = [
		{
			label: t('page.book-appointment.recurrence-pattern.single'),
			value: RecurrencePattern.SINGLE,
		},
		{
			label: t('page.book-appointment.recurrence-pattern.all-future'),
			value: RecurrencePattern.ALL_APPOINTMENTS,
		},
	];
	if (publicSlotDetailsIsLoading) {
		return <Loader />;
	}

	const formattedPreviousDate = format(publicSlotDetails.date, 'dd/MM/yyyy', {
		locale: dateLocale,
	});

	return (
		<Box>
			{mode === 'edit' ? (
				<Box display='flex' justifyContent='center' pb={4}>
					<Text fontWeight={600}>
						{t('page.book-appointment.confirm-edit', {
							previousDate: formattedPreviousDate,
						})}
					</Text>
				</Box>
			) : null}
			<BookingHourWrapper>
				<BookingHour>{patientLabel}</BookingHour>
				<BookingHour>{therapistLabel}</BookingHour>
			</BookingHourWrapper>
			<FormProvider {...methods}>
				{mode === 'book' ? (
					<>
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
										name='recurrencePattern'
									/>
								</Box>
							) : null}
						</SwitchingBoxes>
					</>
				) : (
					<Box px={4}>
						<Text pb={3} fontWeight={600}>
							{t('page.book-appointment.edit-recurrence-title')}
						</Text>
						<RadioButtonGroup
							items={shouldRecurrencePattern}
							name='recurrencePattern'
							required
						/>
					</Box>
				)}
			</FormProvider>
		</Box>
	);
});

BookingAppointment.displayName = 'BookingAppointment';
