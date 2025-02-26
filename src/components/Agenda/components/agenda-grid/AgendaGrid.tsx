import { Fragment } from 'react';
import { Grid } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import {
	generateTimeSlots,
	generateWeekDaysFromSelected,
	isBeforeToday,
} from '@psycron/utils/variables';

import {
	filterDayHoursByAvailability,
	getSlotStatus,
	isSelectedDay,
} from '../../helpers/agendaHelpers';
import { AgendaSlot } from '../agenda-slot/AgendaSlot';
import type { StyledAgendaStatusProps } from '../agenda-slot/AgendaSlot.types';

import { StyledGridHours, StyledHoursWrapper } from './AgendaGrid.styles';
import type { IAgendaGrid } from './AgendaGrid.types';

export const AgendaGrid = ({
	availability,
	clickedSlot,
	currentWeekStart,
	isBig,
	isFirstAppointment,
	isTherapist,
	onSlotClick,
	selectedDay,
}: IAgendaGrid) => {
	const dayHours = generateTimeSlots(
		availability?.latestAvailability?.consultationDuration
	);
	const filteredDayHours = filterDayHoursByAvailability(
		dayHours,
		availability?.latestAvailability?.availabilityDates
	);

	const weekDays = generateWeekDaysFromSelected(currentWeekStart);

	return (
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
									onSlotClick({
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
	);
};
