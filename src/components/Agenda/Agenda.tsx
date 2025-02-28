import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { Loader } from '@psycron/components/loader/Loader';
import { Modal } from '@psycron/components/modal/Modal';
import { Text } from '@psycron/components/text/Text';
import { useAppointmentActions } from '@psycron/context/appointment/appointment-actions/AppointmentActionsContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { APPOINTMENTS } from '@psycron/pages/urls';
import {
	formatDate,
	formatDateTimeToLocale,
	generateTimeSlots,
	generateWeekDaysFromSelected,
	isBeforeToday,
} from '@psycron/utils/variables';
import { addDays, subDays } from 'date-fns';

import { AgendaAppointmentDetails } from './components/agenda-appointment-details/AgendaAppointmentDetails';
import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaSlot } from './components/agenda-slot/AgendaSlot';
import type { StyledAgendaStatusProps } from './components/agenda-slot/AgendaSlot.types';
import { ConfirmationModal } from './components/confirmation-modal/ConfirmationModal';
import { WeekDaysHeader } from './components/week-days/WeekDaysHeader';
import {
	filterDayHoursByAvailability,
	getSlotStatus,
	isSelectedDay,
} from './helpers/agendaHelpers';
import { StyledGridHours, StyledHoursWrapper } from './Agenda.styles';
import type { IAgenda, IAgendaClick } from './Agenda.types';

export const Agenda = ({
	selectedDay,
	availability,
	isLoading,
	isFirstAppointment,
	isTherapist,
	isEditingMode,
}: IAgenda) => {
	const { t } = useTranslation();

	const {
		userId,
		locale,
		oldSessionSlotId: selectedSlotIdFromURL,
	} = useParams<{
		locale: string;
		oldSessionSlotId: string;
		userId: string;
	}>();

	const navigate = useNavigate();

	const { editAppointmentMttn, isEditAppointmentLoading } =
		useAppointmentActions();

	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(selectedDay);

	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [clickedSlot, setClickedSlot] = useState<string | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
	const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

	const [proceed, setProceed] = useState<boolean>(false);

	// isTherapist click states
	const [isTherapistClick, setIsTherapistClick] = useState<boolean>(false);

	const [slotToValidString, setSlotToValidString] = useState<string>('');

	// isEditingMode
	const [selectedEditingSlot, setSelectedEditingSlot] =
		useState<IAgendaClick | null>(null);

	const [selectedEditingDay, setSelectedEditingDay] = useState<string | null>(
		null
	);
	const [selectedEditingHour, setSelectedEditingHour] = useState<string | null>(
		null
	);

	const [isConfirmingEdit, setIsConfirmingEdit] = useState<boolean>(false);

	const {
		isUserDetailsLoading,
		userDetails,
		appointmentDetailsBySlotId,
		therapistId,
	} = useUserDetails('', selectedSlotIdFromURL);

	const patientIdFromAppointment =
		appointmentDetailsBySlotId?.appointment.patient?._id;

	const { bookAppointmentFromLinkMttnIsLoading, latestPatientId } = usePatient(
		patientIdFromAppointment
	);

	useEffect(() => {
		if (selectedEditingSlot !== null && selectedEditingSlot.day) {
			setSelectedEditingDay(formatDate(selectedEditingSlot?.day, locale));
			setSelectedEditingHour(selectedEditingSlot.hour);
		}
	}, [locale, selectedEditingSlot]);

	useEffect(() => {
		if (isClicked && clickedSlot) {
			const formattedClickedSlot = formatDateTimeToLocale(clickedSlot, locale);
			return setSlotToValidString(formattedClickedSlot);
		}
	}, [clickedSlot, isClicked, locale]);

	const dayHours = generateTimeSlots(
		availability?.latestAvailability?.consultationDuration
	);

	const weekDays = generateWeekDaysFromSelected(currentWeekStart);

	const goToNextWeek = () => {
		const nextWeekStart = addDays(currentWeekStart, 7);
		setCurrentWeekStart(nextWeekStart);
	};

	const hasPreviousDates = () => {
		return availability?.latestAvailability?.availabilityDates?.some(
			(date) => new Date(date.date) < currentWeekStart
		);
	};

	const hasNextDates = () => {
		return availability?.latestAvailability?.availabilityDates?.some(
			(date) => new Date(date.date) >= addDays(currentWeekStart, 7)
		);
	};

	const previousWeekStart = selectedDay
		? subDays(currentWeekStart, 7)
		: undefined;

	const goToPreviousWeek = () => {
		if (selectedDay) setCurrentWeekStart(previousWeekStart);
	};

	const filteredDayHours = filterDayHoursByAvailability(
		dayHours,
		availability?.latestAvailability?.availabilityDates
	);

	const handleBookAppointment = (
		props: Pick<IAgendaClick, 'day' | 'hour' | 'status'>
	) => {
		const { status, hour, day } = props;
		const selectedDateHour = new Date(day.setHours(Number(hour.split(':')[0])));

		const slotKey = `${day.toDateString()}_${hour}`;

		if (status === 'booked' || status === 'beforeToday') {
			return;
		}

		setClickedSlot(slotKey);
		setIsClicked(true);
		setSelectedSlot(selectedDateHour);
	};

	const handleTherapistClick = (
		props: Pick<IAgendaClick, 'day' | 'hour' | 'status' | 'slotStatus'>
	) => {
		const { hour, day, slotStatus } = props;

		if (slotStatus !== 'BOOKED' || !availability) return;

		const foundSlot = availability.latestAvailability.availabilityDates
			.find((availabilityDate) => {
				const parsedDate = new Date(availabilityDate?.date);
				return parsedDate.toDateString() === day.toDateString();
			})
			?.slots.find((slot) => slot.startTime === hour);

		if (!foundSlot) return;

		setSelectedSlotId(foundSlot._id);
		setIsTherapistClick(true);
	};

	const handleClick = (props: IAgendaClick) => {
		const { slotStatus, beforeToday, status, hour, day } = props;

		if (isEditingMode && beforeToday) return null;
		if (isEditingMode && status !== 'available') return null;

		if (isEditingMode) {
			setSelectedEditingSlot({ day, hour, slotStatus, status, beforeToday });
			setIsConfirmingEdit(true);

			return;
		}

		if (isTherapist) {
			return handleTherapistClick({ day, hour, status, slotStatus });
		} else if (!beforeToday && slotStatus === 'AVAILABLE' && selectedDay) {
			return handleBookAppointment({ day, hour, status });
		}
	};

	const handleCancel = useCallback(() => {
		setIsClicked(false);
		setClickedSlot(null);
		setProceed(false);
	}, []);

	const handleIsTherapistClickCancel = useCallback(() => {
		setIsTherapistClick(false);
		setClickedSlot(null);
	}, []);

	const handleEditAppointment = (oldSessionSlotId: string) => {
		if (!oldSessionSlotId || !availability) return;

		const foundDate = availability.latestAvailability.availabilityDates.find(
			(dateObj) => dateObj.slots.some((slot) => slot._id === oldSessionSlotId)
		)?.date;

		if (!foundDate) return;

		const formattedDate = new Date(foundDate).toISOString().split('T')[0];

		navigate(`../${APPOINTMENTS}/${oldSessionSlotId}?date=${formattedDate}`);
	};

	const handleSaveEditAppointment = (
		selectedEditingSlot: IAgendaClick,
		selectedSlotIdFromURL: string
	) => {
		if (
			!selectedEditingSlot ||
			!therapistId ||
			!latestPatientId ||
			!selectedSlotIdFromURL
		) {
			return;
		}

		const foundSelectedDay =
			availability.latestAvailability.availabilityDates.find(
				(date) =>
					new Date(date.date).toDateString() ===
					selectedEditingSlot.day.toDateString()
			);

		const foundSlot = foundSelectedDay.slots.find(
			(slot) => slot.startTime === selectedEditingSlot.hour
		);

		const formattedEditAppointmentData = {
			newData: {
				newDate: selectedEditingSlot.day,
				newSessionSlotId: foundSlot._id,
			},
			oldSessionSlotId: selectedSlotIdFromURL,
			therapistId: userDetails._id,
			patientId: patientIdFromAppointment,
		};

		editAppointmentMttn(formattedEditAppointmentData);
		setIsConfirmingEdit(false);
	};

	const handleDeleteAppointment = (patientId: string) => {
		navigate(`../${APPOINTMENTS}/cancel/${patientId}`);
	};

	const selectedDaysSet = new Set(
		weekDays
			.filter((day) => isSelectedDay(selectedDay, day))
			.map((day) => day.toDateString())
	);

	if (isLoading || isUserDetailsLoading || isEditAppointmentLoading) {
		return <Loader />;
	}

	return (
		<>
			<Grid container width='100%' overflow={'auto'} height={'100%'}>
				<WeekDaysHeader selectedDay={currentWeekStart} />
				<Grid container columns={8} mt={5}>
					{filteredDayHours.map((hour, hourIndex) => (
						<Fragment key={`hour-slot-${hourIndex}`}>
							<StyledGridHours item xs={1} columns={1}>
								<StyledHoursWrapper>
									<Text variant='caption'>{hour}</Text>
								</StyledHoursWrapper>
							</StyledGridHours>
							{weekDays.map((day, index) => {
								const slotStatus = getSlotStatus(
									day,
									hour,
									availability.latestAvailability.availabilityDates
								);

								let status: StyledAgendaStatusProps;

								switch (slotStatus) {
									case 'AVAILABLE':
										status = 'available';
										break;
									case 'BOOKED':
										status = 'booked';
										break;
									case 'BLOCKED':
									case 'ONHOLD':
									case 'CANCELLED':
										status = 'unavailable';
										break;
									default:
										status = 'default';
								}
								const beforeToday = isBeforeToday(day);
								const slotKey = `${day.toDateString()}_${hour}`;

								if (beforeToday && isFirstAppointment) {
									status = 'beforeToday';
								} else if (clickedSlot === slotKey) {
									status = 'clicked';
								}

								const isSelected = selectedDaysSet.has(day.toDateString());
								const isFirstSlot = hourIndex === 0;
								const isLastSlot = hourIndex === filteredDayHours.length - 1;

								return (
									<AgendaSlot
										key={`day-slot-${index}`}
										day={day}
										hour={hour}
										slotStatus={slotStatus}
										status={status}
										clickedSlot={clickedSlot}
										beforeToday={beforeToday}
										isTherapist={isTherapist}
										isSelectedDay={isSelected}
										isFirstSlot={isFirstSlot}
										isLastSlot={isLastSlot}
										handleSlotClick={() =>
											handleClick({
												day,
												hour,
												status,
												beforeToday,
												slotStatus,
											})
										}
									/>
								);
							})}
						</Fragment>
					))}
				</Grid>
			</Grid>
			<AgendaPagination
				onGoToNextWeek={goToNextWeek}
				onGoToPreviousWeek={goToPreviousWeek}
				onGoToToday={() => setCurrentWeekStart(selectedDay)}
				onGoToMonthView={() => console.log('Open month view')}
				disablePrevious={!hasPreviousDates()}
				disableNext={!hasNextDates()}
				isTherapist={isTherapist}
			/>
			<Modal
				openModal={isClicked}
				cardActionsProps={{
					actionName: t('components.link.navigate.next'),
					onClick: () => setProceed(true),
					hasSecondAction: true,
					secondActionName: t('components.link.navigate.back'),
					secondAction: handleCancel,
				}}
				isLoading={bookAppointmentFromLinkMttnIsLoading}
			>
				{bookAppointmentFromLinkMttnIsLoading ? (
					<Loader />
				) : (
					<>
						<Box>
							<Text pb={5}>
								{t('components.agenda.modal', {
									appointment: slotToValidString,
								})}
							</Text>
						</Box>
						<ConfirmationModal
							openConfirmationModal={proceed}
							handleCancelConfirmation={handleCancel}
							selectedSlot={selectedSlot}
							therapistId={userId}
							availabilityId={availability?.latestAvailability?._id}
						/>
					</>
				)}
			</Modal>
			{/* therapist user edit slots modal */}
			<Modal
				openModal={isTherapistClick && selectedSlotId !== null}
				title={t('components.agenda.appointment-details.title')}
				onClose={handleIsTherapistClickCancel}
				cardActionsProps={{
					actionName: t(
						'components.agenda.appointment-details.edit-patient-appointment'
					),
					onClick: () => {
						handleEditAppointment(selectedSlotId);
					},
					hasSecondAction: true,
					secondActionName: t('components.agenda.cancel-appointment.title'),
					secondAction: () => handleDeleteAppointment(latestPatientId),
				}}
			>
				<AgendaAppointmentDetails
					selectedSlotId={selectedSlotId}
					handleEditAppointment={handleEditAppointment}
				/>
			</Modal>

			<Modal
				openModal={isConfirmingEdit}
				onClose={() => setIsConfirmingEdit(false)}
				title={t(
					'components.agenda.appointment-details.edit-patient-appointment'
				)}
				cardActionsProps={{
					actionName: 'Confirm',
					onClick: () =>
						handleSaveEditAppointment(
							selectedEditingSlot,
							selectedSlotIdFromURL
						),
					hasSecondAction: true,
					secondActionName: t('components.link.navigate.back'),
					secondAction: () => setIsConfirmingEdit(false),
				}}
			>
				{selectedEditingSlot && (
					<Box>
						<Text>{t('components.agenda.edit-appointment.confirmation')}</Text>
						<Box display='flex' py={1}>
							<Text fontWeight={600} pr={1}>
								{t('globals.date')}:
							</Text>
							<Text>{selectedEditingDay}</Text>
						</Box>
						<Box display='flex' py={1}>
							<Text fontWeight={600} pr={1}>
								{t('globals.starts')}:
							</Text>
							<Text>{selectedEditingHour}</Text>
						</Box>
					</Box>
				)}
			</Modal>
		</>
	);
};
