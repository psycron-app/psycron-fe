import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Grid, IconButton } from '@mui/material';
import { usePatient } from '@psycron/context/patient/PatientContext';
import {
	formatDateTimeToLocale,
	generateTimeSlots,
	generateWeekDaysFromSelected,
	isBeforeToday,
} from '@psycron/utils/variables';
import { addDays, isBefore, subDays } from 'date-fns';

import { ChevronLeft, ChevronRight } from '../icons';
import { Loader } from '../loader/Loader';
import { Modal } from '../modal/Modal';
import { Text } from '../text/Text';

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
	isBig,
	isTherapist,
}: IAgenda) => {
	const { t } = useTranslation();

	const { userId, locale } = useParams<{
		locale: string;
		userId: string;
	}>();

	const { bookAppointmentFromLinkMttnIsLoading } = usePatient();

	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(selectedDay);

	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [clickedSlot, setClickedSlot] = useState<string | null>(null);

	const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

	const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

	const [proceed, setProceed] = useState<boolean>(false);

	// isTherapist click states
	const [isTherapistClick, setIsTherapistClick] = useState<boolean>(false);
	const [proceedTherapistClick, setProceedTherapistClick] =
		useState<boolean>(false);

	const [slotToValidString, setSlotToValidString] = useState<string>('');

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

	const previousWeekStart = subDays(currentWeekStart, 7);

	const goToPreviousWeek = () => {
		setCurrentWeekStart(previousWeekStart);
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

		if (isTherapist) {
			return handleTherapistClick({ day, hour, status, slotStatus });
		} else if (!beforeToday && slotStatus === 'AVAILABLE') {
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
		setProceedTherapistClick(false);
		setClickedSlot(null);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Grid container width='100%' overflow={'auto'} height={'100%'}>
				{isFirstAppointment ? (
					<Grid container spacing={1} columns={8}>
						<Grid item xs={1} columns={1}>
							<Box display='flex' justifyContent='flex-start'>
								<IconButton
									onClick={goToPreviousWeek}
									disabled={isBefore(previousWeekStart, selectedDay)}
								>
									<ChevronLeft />
								</IconButton>
							</Box>
						</Grid>
						<Grid item xs={6} columns={5}></Grid>
						<Grid item xs={1} columns={1}>
							<Box display='flex' justifyContent='flex-end'>
								<IconButton onClick={goToNextWeek}>
									<ChevronRight />
								</IconButton>
							</Box>
						</Grid>
					</Grid>
				) : null}
				<WeekDaysHeader selectedDay={currentWeekStart} />
				<Grid container spacing={1} columns={8} mt={5} rowGap={isBig ? 4 : 0}>
					{filteredDayHours.map((hour, index) => (
						<Fragment key={`hour-slot-${index}`}>
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

								const isSelected = isSelectedDay(selectedDay, day);
								const beforeToday = isBeforeToday(day);
								const slotKey = `${day.toDateString()}_${hour}`;

								if (isSelected) {
									status = 'selected';
								} else if (beforeToday && isFirstAppointment) {
									status = 'beforeToday';
								} else if (clickedSlot === slotKey) {
									status = 'clicked';
								}

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
				title={'Appointment Details'}
				cardActionsProps={{
					actionName: 'Edit',
					onClick: () => setProceedTherapistClick(true),
					hasSecondAction: true,
					secondActionName: t('components.link.navigate.back'),
					secondAction: handleIsTherapistClickCancel,
				}}
			>
				<AgendaAppointmentDetails selectedSlotId={selectedSlotId} />
			</Modal>
		</>
	);
};
