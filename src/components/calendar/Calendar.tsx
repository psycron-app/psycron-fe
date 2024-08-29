import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
	addDays,
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
	StyledCalendarNumber,
	StyledCalendarNumberWrapper,
	StyledCalendarWrapper,
	StyledChevronWrapper,
	StyledPaper,
	StyledTitle,
} from './Calendar.styles';
import type { ICalendarProps } from './Calendar.types';

export const Calendar = ({
	handleDayClick,
	dateLocale,
	today,
}: ICalendarProps) => {
	const [currMonth, setCurrMonth] = useState<Date>(() => today);

	const getWeekDays = () => {
		const start = startOfWeek(today, { locale: dateLocale });
		return Array.from({ length: 7 }).map((_, index) => {
			const day = addDays(start, index);
			return format(day, 'EEEE', { locale: dateLocale })
				.charAt(0)
				.toUpperCase();
		});
	};

	const daysOfWeek = getWeekDays();

	const startOfCurrentMonth = startOfMonth(currMonth);
	const endOfCurrentMonth = endOfMonth(currMonth);

	const startOfCalendar = startOfWeek(startOfCurrentMonth, {
		locale: dateLocale,
	});
	const endOfCalendar = endOfWeek(endOfCurrentMonth, { locale: dateLocale });

	const daysInCalendar = eachDayOfInterval({
		start: startOfCalendar,
		end: addMonths(endOfCalendar, 1),
	}).slice(0, 42);

	const handlePreviousMonth = () => {
		setCurrMonth((prev) => subMonths(prev, 1));
	};

	const handleNextMonth = () => {
		setCurrMonth((prev) => addMonths(prev, 1));
	};

	return (
		<StyledCalendarWrapper>
			<StyledPaper>
				<StyledTitle py={2}>
					<Text variant='body2' isFirstUpper>
						{format(currMonth, 'MMMM yyyy', { locale: dateLocale })}
					</Text>
					<StyledChevronWrapper>
						<IconButton onClick={handlePreviousMonth}>
							<ChevronLeft />
						</IconButton>
						<IconButton onClick={handleNextMonth}>
							<ChevronRight />
						</IconButton>
					</StyledChevronWrapper>
				</StyledTitle>
				<Box
					display='grid'
					gridTemplateColumns='repeat(7, 1fr)'
					textAlign='center'
				>
					{daysOfWeek.map((day, index) => (
						<Text isFirstUpper key={`${day}-${index}`} variant='body2'>
							{day}
						</Text>
					))}
				</Box>
				<Box
					display='grid'
					gridTemplateColumns='repeat(7, 1fr)'
					gridAutoRows='30px'
					mt={1}
				>
					{daysInCalendar.map((day, index) => {
						const isCurrentMonth: boolean =
							day.getMonth() === currMonth.getMonth() &&
							day.getFullYear() === currMonth.getFullYear();

						const isCurrentDay: boolean =
							day.getDate() === today.getDate() &&
							day.getMonth() === today.getMonth() &&
							day.getFullYear() === today.getFullYear();

						return (
							<StyledCalendarNumberWrapper
								key={`${day}-${index}`}
								isCurrentMonth={isCurrentMonth}
								onClick={() => handleDayClick(day)}
							>
								<StyledCalendarNumber
									variant='body2'
									isCurrentDay={isCurrentDay}
									isCurrentMonth={isCurrentMonth}
								>
									{format(day, 'd')}
								</StyledCalendarNumber>
							</StyledCalendarNumberWrapper>
						);
					})}
				</Box>
			</StyledPaper>
		</StyledCalendarWrapper>
	);
};
