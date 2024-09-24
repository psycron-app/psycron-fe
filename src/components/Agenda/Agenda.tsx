import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Icon } from '@mui/material';
import type { IAvailabilityDate } from '@psycron/api/user/index.types';
import {
	generateTimeSlots,
	generateWeekDaysFromSelected,
} from '@psycron/utils/variables';

import { Available, UnAvailable } from '../icons';
import { Loader } from '../loader/Loader';
import { Text } from '../text/Text';
import { Tooltip } from '../tooltip/Tooltip';

import { WeekDaysHeader } from './components/WeekDays/WeekDaysHeader';
import {
	StyledGridHours,
	StyledGridSlots,
	StyledHoursWrapper,
	StyledSlotsWrapper,
} from './Agenda.styles';
import type { IAgenda } from './Agenda.types';

export const Agenda = ({ selectedDay, availability, isLoading }: IAgenda) => {
	const { t } = useTranslation();

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

	const getStatusIcon = (status: string) => {
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

	if (isLoading) {
		<Loader />;
	}

	return (
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

							const isAvailable = slotStatus === 'AVAILABLE';
							const isBooked = slotStatus === 'BOOKED';

							const shouldShow = isAvailable || isBooked;

							const translatedStatus = translateSlotStatus(slotStatus);
							const statusIcon = getStatusIcon(slotStatus);

							const isSelected = isSelectedDay(selectedDay, day);

							return (
								<StyledGridSlots
									key={`day-slot-${index}`}
									item
									xs={1}
									isAvailable={isAvailable}
									isBooked={isBooked}
									isSelected={isSelected}
								>
									<StyledSlotsWrapper>
										{shouldShow ? (
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
	);
};
