import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
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

export const Calendar = ({
	handleDayClick,
	dateLocale,
	today,
	isEditing,
	isBig,
	filteredDates,
	selectAllRemaining,
	isWizard,
}: ICalendarProps) => {
	const [currMonth, setCurrMonth] = useState<Date>(() => today);

	const [selectedDates, setSelectedDates] = useState<Date[] | null>(null);

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

	// const toggleDateSelection = (day: Date) => {
	// 	setSelectedDates((prevSelectedDates) => {
	// 		const isSelected = prevSelectedDates.some(
	// 			(selectedDay) =>
	// 				selectedDay.getDate() === day.getDate() &&
	// 				selectedDay.getMonth() === day.getMonth() &&
	// 				selectedDay.getFullYear() === day.getFullYear()
	// 		);

	// 		if (isSelected) {
	// 			return prevSelectedDates.filter(
	// 				(selectedDay) =>
	// 					!(
	// 						selectedDay.getDate() === day.getDate() &&
	// 						selectedDay.getMonth() === day.getMonth() &&
	// 						selectedDay.getFullYear() === day.getFullYear()
	// 					)
	// 			);
	// 		} else {
	// 			return [...prevSelectedDates, day];
	// 		}
	// 	});
	// 	handleDayClick?.(day);
	// };

	useEffect(() => {
		if (selectAllRemaining) {
			setSelectedDates(filteredDates);
		} else {
			setSelectedDates([]);
		}
	}, [selectAllRemaining, filteredDates]);

	const isCurrentMonth = (day: Date) => {
		return (
			day.getMonth() === currMonth.getMonth() &&
			day.getFullYear() === currMonth.getFullYear()
		);
	};

	const isCurrentDay = (day: Date) => {
		return (
			day.getDate() === today.getDate() &&
			day.getMonth() === today.getMonth() &&
			day.getFullYear() === today.getFullYear()
		);
	};

	// const isDateSelected = (day: Date) => {
	// 	return selectedDates?.some(
	// 		(selectedDay) =>
	// 			selectedDay.getDate() === day.getDate() &&
	// 			selectedDay.getMonth() === day.getMonth() &&
	// 			selectedDay.getFullYear() === day.getFullYear()
	// 	);
	// };

	// const isDateDisabled = (date: Date) => {
	// 	return !filteredDates.some(
	// 		(filteredDate) =>
	// 			filteredDate.getDate() === date.getDate() &&
	// 			filteredDate.getMonth() === date.getMonth() &&
	// 			filteredDate.getFullYear() === date.getFullYear()
	// 	);
	// };

	return (
		<StyledCalendarWrapper isBig={isBig}>
			<StyledPaper>
				{!isWizard ? (
					<StyledTitle isBig={isBig}>
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
				) : null}

				<StyledWeekDays isBig={isBig}>
					{daysOfWeek.map((day, index) => (
						<Text isFirstUpper key={`${day}-${index}`} variant='body2'>
							{day}
						</Text>
					))}
				</StyledWeekDays>
				<DaysWrapper isBig={isBig}>
					{daysInCalendar.map((day, index) => {
						const currentMonth = isCurrentMonth(day);

						const currentDay = isCurrentDay(day);

						// const seleted = isDateSelected(day);

						// const isDisabled = isDateDisabled(day);

						return (
							<StyledCalendarNumberWrapper
								key={`${day}-${index}`}
								isCurrentMonth={currentMonth}
								isBig={isBig}
								isDisabled={false}
								// onClick={() =>
								// 	isEditing ? toggleDateSelection(day) : handleDayClick(day)
								// }
							>
								<StyledCalendarNumber
									variant='body2'
									isCurrentDay={currentDay}
									isCurrentMonth={currentMonth}
									isSelected={false}
									isBig={isBig}
									isDisabled={false}
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
