import { useRef, useState } from 'react';
import { Grid } from '@mui/material';
import type { IAvailabilityResponse } from '@psycron/api/user/index.types';
import { Loader } from '@psycron/components/loader/Loader';
import { Text } from '@psycron/components/text/Text';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { generateTimeSlots } from '@psycron/utils/variables';
import { addDays, subDays } from 'date-fns';

import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaSlotNew } from './components/agenda-slot/AgendaSlotNew';
import { WeekDaysHeader } from './components/week-days/WeekDaysHeader';
import { filteredAvailabilityBasedOnRange } from './helpers/agendaHelpers';
import { HourSlotWrapper } from './AgendaNew.styles';

export interface IAgendaPropsNew {
	availability: IAvailabilityResponse;
	daySelectedFromCalendar: Date;
}

export const AgendaNew = ({
	availability,
	daySelectedFromCalendar,
}: IAgendaPropsNew) => {
	// HILIGHTED DAY SELECTED FROM CALENDAR
	const [dayFromCalendar, setDayFromCalendar] = useState<Date>(
		daySelectedFromCalendar
	);

	// HOVER HOUR SLOT 1st COLUMN ITEM
	const isHoveringRow = useRef(false);
	const [hoveredRowHour, setHoveredRowHour] = useState<string | null>(null);

	if (!availability || !availability.latestAvailability) {
		return <Loader />;
	}

	const {
		latestAvailability: { consultationDuration, availabilityDates },
	} = availability;

	const dayHoursGeneratedByApptDuration =
		generateTimeSlots(consultationDuration);

	const { filteredHoursRange, filteredAvailabilityItem } =
		filteredAvailabilityBasedOnRange(
			dayHoursGeneratedByApptDuration,
			availabilityDates
		);

	const visibleAvailabilityPerWeek = filteredAvailabilityItem.slice(0, 7);

	// HANDLE PAGINATION ACTIONS
	const goToNextWeek = () => {
		const nextWeekStart = addDays(dayFromCalendar, 7);
		setDayFromCalendar(nextWeekStart);
	};

	const goToPreviousWeek = () => {
		const previousWeekStart = daySelectedFromCalendar
			? subDays(dayFromCalendar, 7)
			: undefined;

		if (daySelectedFromCalendar) setDayFromCalendar(previousWeekStart);
	};

	const hasPreviousDates = () => {
		return availabilityDates.some(
			(date) => new Date(date.date) < dayFromCalendar
		);
	};

	const hasNextDates = () => {
		return availabilityDates.some(
			(date) => new Date(date.date) >= addDays(dayFromCalendar, 7)
		);
	};

	// HANDLE HOVER HOUR
	const handleHourHoverClick = (hour: string) => {
		if (hoveredRowHour !== hour) {
			setHoveredRowHour(hour);
		}
		isHoveringRow.current = true;
	};

	const handleSlotMouseEnter = (hour: string) => {
		if (hoveredRowHour !== hour) {
			setHoveredRowHour(null);
		}

		isHoveringRow.current = false;
	};

	const handleSlotMouseLeave = (hour: string) => {
		if (hoveredRowHour !== hour) {
			setHoveredRowHour(null);
		}
		isHoveringRow.current = false;
	};

	const handleMouseLeaveTable = () => {
		isHoveringRow.current = false;
	};

	return (
		<Grid
			container
			width='100%'
			overflow={'auto'}
			height={'100%'}
			onMouseLeave={handleMouseLeaveTable}
		>
			<WeekDaysHeader selectedDay={dayFromCalendar} />
			<Grid container columns={8} mt={5}>
				{/* HOURS COLUMN STARTS*/}
				<Grid item xs={1}>
					{filteredHoursRange.map((hour, index) => (
						<HourSlotWrapper
							key={index}
							onClick={() => handleHourHoverClick(hour)}
							onMouseEnter={() => handleHourHoverClick(hour)}
						>
							<Text variant='caption'>{hour}</Text>
						</HourSlotWrapper>
					))}
				</Grid>
				{/* HOURS COLUMN ENDS*/}

				{/* SLOTS COLUMNS STARTS */}
				{visibleAvailabilityPerWeek.map(
					({ _id, slots }, columnIndex, array) => (
						<Grid item xs={1} key={_id}>
							{filteredHoursRange.map((hour, hourIndex) => {
								const slot = slots.find((slot) => slot.startTime === hour);
								const isLastInRow = columnIndex === array.length - 1;

								const dummySlot: ISlot = {
									startTime: hour,
									status: 'EMPTY',
									endTime: slot?.endTime,
									_id: slot?._id,
								};

								return (
									<AgendaSlotNew
										key={hourIndex}
										isSlotDetailsOpen={false}
										isTherapistView={true}
										slot={slot ?? dummySlot}
										hoveredHour={hoveredRowHour}
										isLastInRow={isLastInRow}
										onMouseEnter={() => handleSlotMouseEnter(hour)}
										onMouseLeave={() => handleSlotMouseLeave(hour)}
									/>
								);
							})}
						</Grid>
					)
				)}
				{/* SLOTS COLUMNS ENDS */}
			</Grid>
			{/* PAGINATION STARTS */}
			<AgendaPagination
				onGoToNextWeek={goToNextWeek}
				onGoToPreviousWeek={goToPreviousWeek}
				onGoToToday={() => setDayFromCalendar(daySelectedFromCalendar)}
				onGoToMonthView={() => console.log('Open month view')}
				disablePrevious={!hasPreviousDates()}
				disableNext={!hasNextDates()}
				isTherapist={true}
			/>
			{/* PAGINATION ENDS */}
		</Grid>
	);
};
