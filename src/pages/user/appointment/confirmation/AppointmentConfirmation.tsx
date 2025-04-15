import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import type { CancelAppointmentFormData } from '@psycron/api/user/availability/index.types';
import { CancellationReasonEnum } from '@psycron/api/user/availability/index.types';
import { Button } from '@psycron/components/button/Button';
import type { ISelectedSlot } from '@psycron/components/calendar/big-calendar/BigCalendar.types';
import { getFormattedTimeLabels } from '@psycron/components/calendar/big-calendar/components/appointment-details/utils';
import { Globe, MapPin } from '@psycron/components/icons';
import { Link } from '@psycron/components/link/Link';
import { Loader } from '@psycron/components/loader/Loader';
import { Modal } from '@psycron/components/modal/Modal';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';
import { Text } from '@psycron/components/text/Text';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { SEOProvider } from '@psycron/context/seo/SEOContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useAppointmentParams } from '@psycron/hooks/useAppointmentParams';
import { useCancellationReasons } from '@psycron/hooks/useCancellationReasons';
import { DOMAIN, PATIENTEDITAPPOINTMENT } from '@psycron/pages/urls';
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
	const [isEditOrCancelOpen, setIsEditOrCancelOpen] = useState<boolean>(false);
	const [isCancelReasonOpen, setIsCancelReasonOpen] = useState<boolean>(false);
	const [selectedSlotToEdit, setSelectedSlotToEdit] =
		useState<ISelectedSlot | null>(null);

	const { locale, patientId, userId: therapistId } = useAppointmentParams();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const { patientDetails, isPatientDetailsLoading } = usePatient(
		therapistId,
		patientId
	);

	const { userDetails, isUserDetailsLoading } = useUserDetails(therapistId);
	const {
		cancelAppointment,
		cancelAppointmentIsLoading,
		cancelAppointmentSuccess,
	} = useAvailability(undefined, undefined, undefined, patientId);
	const cancellationReasons = useCancellationReasons();

	const handleCloseAll = () => {
		setIsCancelReasonOpen(false);
		setIsEditOrCancelOpen(false);
	};

	useEffect(() => {
		if (cancelAppointmentSuccess) {
			handleCloseAll();
		}
	}, [cancelAppointmentSuccess]);

	const methods = useForm<CancelAppointmentFormData>({
		mode: 'onChange',
	});

	const { watch } = methods;

	const reasonCode = watch('reasonCode');

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
		!patientDetails ||
		!userDetails ||
		isPatientDetailsLoading ||
		isUserDetailsLoading
	) {
		return <Loader />;
	}

	const { firstName, lastName } = userDetails;

	const lastIcsNotification = patientDetails.notifications.at(-1);

	const handleEditAppointment = (selectedSlot: ISelectedSlot) => {
		setSelectedSlotToEdit(selectedSlot);
		setIsEditOrCancelOpen(true);
	};

	const handleProceedToEdit = () => {
		if (!selectedSlotToEdit) return;

		const {
			date,
			availabilityDayId,
			slot: { _id: slotId },
		} = selectedSlotToEdit;

		const formattedDate = format(date, 'yyyy-MM-dd');
		navigate(
			`../${therapistId}/${PATIENTEDITAPPOINTMENT}/edit/${availabilityDayId}?slot=${slotId}&date=${formattedDate}`
		);
	};

	const slotInfoText = () => {
		if (!selectedSlotToEdit) return null;

		const {
			date,
			slot: { startTime },
		} = selectedSlotToEdit;

		const formattedDate = format(date, 'EEEE, MMMM do', { locale: dateLocale });
		return t('page.booking-confirmation.cancel-or-edit.appointment-info', {
			date: formattedDate,
			startTime,
		});
	};

	const isOtherSelected =
		reasonCode === CancellationReasonEnum.OTHER.toString();

	const handleCancelSubmit = methods.handleSubmit(
		(formData: CancelAppointmentFormData) => {
			if (!selectedSlotToEdit) {
				return;
			}

			cancelAppointment({
				slotId: selectedSlotToEdit.slot._id,
				patientId,
				therapistId,
				reasonCode: parseInt(formData.reasonCode, 10) as CancellationReasonEnum,
				customReason: formData.customReason || undefined,
				triggeredBy: 'PATIENT',
			});
		}
	);

	const bookApointmentLink = `${therapistId}/${PATIENTEDITAPPOINTMENT}`;

	const pageTitle = t('page.booking-confirmation.title-plain', {
		therapistName: `${firstName} ${lastName}`,
	});

	const pageUrl = `${DOMAIN}/${locale}/${therapistId}/${patientId}/appointment-confirmation`;
	const imageUrl = `${DOMAIN}/psycron-meta.png`;

	const appointment_confirmation_SEO = {
		title: pageTitle,
		description: t('page.book-appointment.description'),
		canonicalUrl: pageUrl,
		ogTitle: t('page.landing.seo.ogTitle'),
		ogDescription: t('page.landing.seo.ogDescription'),
		ogUrl: pageUrl,
		ogType: 'website',
		ogImage: imageUrl,
		twitterCard: 'summary_large_image',
		twitterTitle: t('page.landing.seo.ogTitle'),
		twitterDescription: t('page.landing.seo.ogDescription'),
		twitterImage: imageUrl,
	};

	const downloadIcs = (icsContent: string, filename: string) => {
		const blob = new Blob([icsContent], {
			type: 'text/calendar;charset=utf-8',
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<SEOProvider seo={appointment_confirmation_SEO}>
			<ConfirmationPageWrapper>
				{formattedSessionDates.length ? (
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
				) : null}
				<AppointmentsInfoWrapper>
					{formattedSessionDates.length ? (
						<Box>
							{formattedSessionDates?.map(
								(
									{
										patientLabel,
										therapistLabel,
										date,
										availabilityDayId,
										slot,
									},
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
											title={`${t('globals.edit')} / ${t('globals.cancel')}`}
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
							<Box display='flex' flexDirection='column'>
								<Text variant='caption' py={2}>
									{t('page.booking-confirmation.advise')}
								</Text>
								{lastIcsNotification?.icsContent && (
									<Button
										onClick={() =>
											downloadIcs(
												lastIcsNotification.icsContent,
												`appointment-with-${firstName}.ics`
											)
										}
									>
										{t('page.booking-confirmation.cancel-or-edit.donwload-ics')}
									</Button>
								)}
							</Box>
						</Box>
					) : (
						<Box>
							<Text fontWeight={600} pb={4}>
								{t('page.booking-confirmation.no-appointments-title')}
							</Text>
							<Link to={bookApointmentLink}>
								{t('page.booking-confirmation.no-appointments-link')}
							</Link>
						</Box>
					)}
				</AppointmentsInfoWrapper>
			</ConfirmationPageWrapper>
			<Modal
				title={t('page.booking-confirmation.cancel-or-edit.title')}
				cardActionsProps={{
					actionName: t('globals.edit'),
					onClick: handleProceedToEdit,
					hasSecondAction: true,
					secondActionName: t('globals.cancel'),
					secondAction: () => setIsCancelReasonOpen(true),
				}}
				openModal={isEditOrCancelOpen}
				onClose={() => setIsEditOrCancelOpen(false)}
			>
				<Text textAlign='center' fontWeight={600}>
					{slotInfoText()}
				</Text>
				<Text>{t('page.booking-confirmation.cancel-or-edit.sub')}</Text>
			</Modal>
			<Modal
				cardActionsProps={{
					actionName: t('globals.proceed'),
					onClick: handleCancelSubmit,
					loading: cancelAppointmentIsLoading,
				}}
				openModal={isCancelReasonOpen}
				onClose={handleCloseAll}
			>
				<FormProvider {...methods}>
					<Text textAlign='center'>{t('globals.cancellation-title')}</Text>
					<Box display='flex' flexDirection='column' px={5}>
						<RadioButtonGroup
							items={cancellationReasons}
							name='reasonCode'
							required
						/>
						{isOtherSelected && (
							<Box width='100%' pt={4}>
								<TextField
									label={t('globals.cancellation-other-title')}
									{...methods.register('customReason')}
									fullWidth
								/>
							</Box>
						)}
					</Box>
				</FormProvider>
			</Modal>
		</SEOProvider>
	);
};
