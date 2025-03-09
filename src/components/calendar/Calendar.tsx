import { useState } from 'react';
import { IconButton } from '@mui/material';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { withSkeletonLoading } from '@psycron/hoc/withSkeletonLoading';
import { getWeekDays, isCurrentDay } from '@psycron/utils/variables';
import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	startOfMonth,
	startOfWeek,
	subMonths,
} from 'date-fns';

import { ChevronLeft, ChevronRight } from '../icons';
import { Text } from '../text/Text';

import {
	DaysWrapper,
	StyledCalendarNumber,
	StyledCalendarNumberWrapper,
	StyledCalendarWrapper,
	StyledChevronWrapper,
	StyledPaper,
	StyledTitle,
	StyledWeekDays,
} from './Calendar.styles';
import type { ICalendarProps } from './Calendar.types';

const CalendarComponent = ({
	handleDayClick,
	dateLocale,
	today,
	isBig,
	availabilityData,
}: ICalendarProps) => {
	const [currentDisplayedMonth, setCurrentDisplayedMonth] = useState<Date>(
		() => today
	);

	const daysOfWeek = getWeekDays(today, dateLocale);

	const startOfCurrentMonth = startOfMonth(currentDisplayedMonth);
	const endOfCurrentMonth = endOfMonth(currentDisplayedMonth);
	const startOfCalendarGrid = startOfWeek(startOfCurrentMonth, {
		locale: dateLocale,
	});
	const endOfCalendarGrid = endOfWeek(endOfCurrentMonth, {
		locale: dateLocale,
	});

	const calendarDaysGrid = eachDayOfInterval({
		start: startOfCalendarGrid,
		end: endOfCalendarGrid,
	});

	const availableScheduleDates: IDateInfo[] = Array.isArray(availabilityData)
		? availabilityData
		: (Object.values(availabilityData ?? {}).flat() as IDateInfo[]);

	const isDayAvailableInSchedule = (day: Date) => {
		return availableScheduleDates.some((availability) => {
			const availableDate = new Date(availability.date);
			return (
				availableDate.getDate() === day.getDate() &&
				availableDate.getMonth() === day.getMonth() &&
				availableDate.getFullYear() === day.getFullYear()
			);
		});
	};

	const goToPreviousMonthInCalendar = () =>
		setCurrentDisplayedMonth((prev) => subMonths(prev, 1));

	const goToNextMonthInCalendar = () =>
		setCurrentDisplayedMonth((prev) => addMonths(prev, 1));

	const isDayInDisplayedMonth = (day: Date) =>
		day.getMonth() === currentDisplayedMonth.getMonth() &&
		day.getFullYear() === currentDisplayedMonth.getFullYear();

	return (
		<StyledCalendarWrapper isBig={isBig}>
			<StyledPaper>
				<StyledTitle isBig={isBig}>
					<Text variant='body2' isFirstUpper>
						{format(currentDisplayedMonth, 'MMMM yyyy', { locale: dateLocale })}
					</Text>
					<StyledChevronWrapper>
						<IconButton onClick={goToPreviousMonthInCalendar}>
							<ChevronLeft />
						</IconButton>
						<IconButton onClick={goToNextMonthInCalendar}>
							<ChevronRight />
						</IconButton>
					</StyledChevronWrapper>
				</StyledTitle>

				<StyledWeekDays isBig={isBig}>
					{daysOfWeek.map((day, index) => (
						<Text isFirstUpper key={`${day}-${index}`} variant='body2'>
							{day}
						</Text>
					))}
				</StyledWeekDays>
				<DaysWrapper isBig={isBig}>
					{calendarDaysGrid.map((day, index) => {
						const currentMonth = isDayInDisplayedMonth(day);
						const currentDay = isCurrentDay(day);
						const isAvailable = isDayAvailableInSchedule(day);

						const availability = availableScheduleDates.find(
							(availability) =>
								new Date(availability.date).toDateString() ===
								day.toDateString()
						);

						return (
							<StyledCalendarNumberWrapper
								key={`${day}-${index}`}
								isCurrentMonth={currentMonth}
								isBig={isBig}
								isDisabled={!isAvailable}
								onClick={() => {
									return handleDayClick({
										date: day,
										dateId: availability.dateId,
									});
								}}
							>
								<StyledCalendarNumber
									variant='body2'
									isCurrentDay={currentDay}
									isCurrentMonth={currentMonth}
									isSelected={false}
									isBig={isBig}
									isDisabled={!isAvailable}
									isAvailable={isAvailable}
								>
									{format(day, 'd')}
								</StyledCalendarNumber>
							</StyledCalendarNumberWrapper>
						);
					})}
				</DaysWrapper>
			</StyledPaper>
		</StyledCalendarWrapper>
	);
};

export const Calendar = withSkeletonLoading(CalendarComponent);
