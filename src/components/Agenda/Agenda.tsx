import { Fragment, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Grid, Icon } from '@mui/material';
import type { IAvailabilityDate } from '@psycron/api/user/index.types';
import {
	formatDateTimeToLocale,
	generateTimeSlots,
	generateWeekDaysFromSelected,
	isBeforeToday,
} from '@psycron/utils/variables';

import { Available, ClockIn, UnAvailable } from '../icons';
import { Loader } from '../loader/Loader';
import { Modal } from '../modal/Modal';
import { Text } from '../text/Text';
import { Tooltip } from '../tooltip/Tooltip';

import { ConfirmationModal } from './components/confirmation-modal/ConfirmationModal';
import { WeekDaysHeader } from './components/week-days/WeekDaysHeader';
import {
	StyledGridHours,
	StyledGridSlots,
	StyledHoursWrapper,
	StyledSlotsWrapper,
} from './Agenda.styles';
import type { IAgenda, StyledAgendaStatusProps } from './Agenda.types';

export const Agenda = ({ selectedDay, availability, isLoading }: IAgenda) => {
	const { t } = useTranslation();

	const { userId, locale } = useParams<{
		locale: string;
		userId: string;
	}>();

	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [clickedSlot, setClickedSlot] = useState<string | null>(null);
	const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
	const [proceed, setProceed] = useState<boolean>(false);

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

	const weekDays = generateWeekDaysFromSelected(selectedDay);

	const filterDayHoursByAvailability = (
		dayHours: string[],
		availabilityDates?: IAvailabilityDate[]
	) => {
		const availableTimes: string[] = [];

		availabilityDates?.forEach((dateObj) => {
			dateObj.slots?.forEach((slot) => {
				if (slot.status === 'AVAILABLE') {
					availableTimes.push(slot.startTime);
				}
			});
		});

		const filteredDayHours = dayHours.filter((hour) =>
			availableTimes.includes(hour)
		);

		return filteredDayHours;
	};

	const filteredDayHours = filterDayHoursByAvailability(
		dayHours,
		availability?.latestAvailability?.availabilityDates
	);

	const getSlotStatus = (
		day: Date,
		hour: string,
		availabilityDates: IAvailabilityDate[]
	) => {
		const weekDay = day.toDateString();

		const availabilityForDay = availabilityDates.find((dateObj) => {
			const availabilityDate = new Date(dateObj.date).toDateString();
			return availabilityDate === weekDay;
		});

		if (availabilityForDay) {
			const slot = availabilityForDay.slots.find(
				(slot) => slot.startTime === hour
			);

			return slot ? slot.status : '';
		}

		return '';
	};

	const getStatusIcon = (
		status: string,
		slotKey: string,
		clickedSlot: string | null
	) => {
		if (slotKey === clickedSlot) {
			return <ClockIn />;
		}

		switch (status.toLowerCase()) {
			case 'available':
				return <Available />;
			case 'booked':
				return <UnAvailable />;
			default:
				return null;
		}
	};

	const translateSlotStatus = (status: string) => {
		return t(`page.availability.agenda.status.${status.toLowerCase()}`, status);
	};

	const isSelectedDay = (date1: Date, date2: Date) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	const handleBookAppointment = (
		day: Date,
		hour: string,
		status: StyledAgendaStatusProps
	) => {
		const selectedDateHour = new Date(day.setHours(Number(hour.split(':')[0])));

		const slotKey = `${day.toDateString()}_${hour}`;

		if (status === 'booked' || status === 'beforeToday') {
			return;
		}
		setClickedSlot(slotKey);
		setIsClicked(true);
		setSelectedSlot(selectedDateHour);
	};

	const handleCancel = useCallback(() => {
		setIsClicked(false);
		setClickedSlot(null);
		setProceed(false);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Grid container width='100%' overflow={'auto'} height={'100%'}>
				<WeekDaysHeader selectedDay={selectedDay} />
				<Grid container spacing={1} columns={8} mt={5}>
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

								let status: StyledAgendaStatusProps = 'default';

								if (slotStatus === 'AVAILABLE') {
									status = 'available';
								} else if (slotStatus === 'BOOKED') {
									status = 'booked';
								}

								const isSelected = isSelectedDay(selectedDay, day);
								const beforeToday = isBeforeToday(day);
								const slotKey = `${day.toDateString()}_${hour}`;

								if (isSelected) {
									status = 'selected';
								} else if (beforeToday) {
									status = 'beforeToday';
								} else if (clickedSlot === slotKey) {
									status = 'clicked';
								}

								const translatedStatus = translateSlotStatus(slotStatus);
								const statusIcon = getStatusIcon(
									slotStatus,
									slotKey,
									clickedSlot
								);

								return (
									<StyledGridSlots
										key={`day-slot-${index}`}
										item
										xs={1}
										status={status}
										onClick={() => handleBookAppointment(day, hour, status)}
									>
										<StyledSlotsWrapper>
											{status !== 'default' ? (
												<Tooltip title={translatedStatus}>
													<Icon>{statusIcon}</Icon>
												</Tooltip>
											) : null}
										</StyledSlotsWrapper>
									</StyledGridSlots>
								);
							})}
						</Fragment>
					))}
				</Grid>
			</Grid>
			<Modal
				openModal={isClicked}
				cardActionsProps={{
					actionName: t('components.link.navigate.next'),
					onClick: () => setProceed(true),
					hasSecondAction: true,
					secondActionName: t('components.link.navigate.back'),
					secondAction: handleCancel,
				}}
			>
				<Box>
					<Text>
						Você está marcando a sua consulta para {slotToValidString}
					</Text>
				</Box>
				<ConfirmationModal
					openConfirmationModal={proceed}
					handleCancelConfirmation={handleCancel}
					selectedSlot={selectedSlot}
					therapistId={userId}
					availabilityId={availability?.latestAvailability?._id}
				/>
			</Modal>
		</>
	);
};
