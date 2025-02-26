import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@psycron/components/icons';
import { Loader } from '@psycron/components/loader/Loader';
import { formatDateTimeToLocale } from '@psycron/utils/variables';
import { addDays, formatDate, isBefore, subDays } from 'date-fns';

import { AgendaGrid } from './components/agenda-grid/AgendaGrid';
import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { WeekDaysHeader } from './components/week-days/WeekDaysHeader';
import type { IAgendaClickNew, IAgendaNew } from './AgendaNew.types';

export const AgendaNew = ({
	selectedDay,
	clickedSlot,
	availability,
	isClicked,
	isLoading,
	isFirstAppointment,
	isBig,
	isTherapist,
	isEditingMode,
	modal,
	handleTherapistClick,
	handleBookAppointment,
}: IAgendaNew) => {
	const {
		userId,
		locale,
		oldSessionSlotId: selectedSlotIdFromURL,
	} = useParams<{
		locale: string;
		oldSessionSlotId: string;
		userId: string;
	}>();

	// Week management
	const [currentWeekStart, setCurrentWeekStart] = useState<Date>(selectedDay);
	const goToNextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
	const goToPreviousWeek = () => {
		if (selectedDay) setCurrentWeekStart(previousWeekStart);
	};
	const previousWeekStart = selectedDay
		? subDays(currentWeekStart, 7)
		: undefined;

	// Pagination:
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

	// isEditingMode
	const [selectedEditingSlot, setSelectedEditingSlot] =
		useState<IAgendaClickNew | null>(null);
	const [isConfirmingEdit, setIsConfirmingEdit] = useState<boolean>(false);

	const [selectedEditingDay, setSelectedEditingDay] = useState<string | null>(
		null
	);
	const [selectedEditingHour, setSelectedEditingHour] = useState<string | null>(
		null
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

	const handleClickSlot = (props: IAgendaClickNew) => {
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
				<AgendaGrid
					availability={availability}
					clickedSlot={clickedSlot}
					currentWeekStart={currentWeekStart}
					isBig={isBig}
					isFirstAppointment={isFirstAppointment}
					isTherapist={false}
					onSlotClick={handleClickSlot}
					selectedDay={undefined}
				/>
			</Grid>
			<AgendaPagination
				onGoToNextWeek={goToNextWeek}
				onGoToPreviousWeek={goToPreviousWeek}
				onGoToToday={() => setCurrentWeekStart(selectedDay)}
				onGoToMonthView={() => console.log('Open month view')}
				disablePrevious={!hasPreviousDates()}
				disableNext={!hasNextDates()}
			/>
			<>{modal}</>
		</>
	);
};
