import { useMemo } from 'react';
import type { IAvailabilityDate } from '@psycron/api/user/index.types';
import { generateWeekDays } from '@psycron/utils/variables';
import { addDays, format, isSameDay, parseISO, startOfWeek } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

export const useCalendarWeekData = (
	dayFromCalendar: Date,
	flatAvailabilityDates: IAvailabilityDate[],
	locale: string
) => {
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const weekStart = startOfWeek(dayFromCalendar, { weekStartsOn: 0 });

	const weekDays = generateWeekDays(weekStart);

	const fullWeekAvailability = weekDays?.map((weekDay, index) => {
		const weekDate = addDays(weekStart, index);

		const formattedWeekDate = format(weekDate, 'yyyy-MM-dd');

		const existingDay = flatAvailabilityDates?.find(({ date }) => {
			return format(date, 'yyyy-MM-dd') === formattedWeekDate;
		});

		return {
			weekDay,
			date: weekDate.toISOString(),
			_id: existingDay?._id ?? null,
			slots:
				Array.isArray(existingDay?.slots) && existingDay.slots.length > 0
					? existingDay.slots
					: [],
		};
	});

	const availabilityDates = flatAvailabilityDates;
	const firstItemAvailable = availabilityDates.at(0)?._id;
	const lastItemAvailable = availabilityDates.at(-1)?._id;

	const filteredHoursRange = useMemo(() => {
		const availableStartTimes = new Set(
			availabilityDates?.flatMap((date) =>
				date.slots.map((slot) => slot.startTime)
			)
		);
		return Array.from(availableStartTimes).sort();
	}, [availabilityDates]);

	const getSlotsForDayAndHour = (day: Date, hour: string) => {
		const dayData = fullWeekAvailability.find(({ date }) =>
			isSameDay(parseISO(date), day)
		);

		return {
			slots: dayData?.slots.filter((slot) => slot.startTime === hour) || [],
			dateId: dayData?._id ?? null,
		};
	};

	const isLastItemWithinWeek = fullWeekAvailability.some(
		(day) => day._id === lastItemAvailable
	);
	const isFirstItemWithinWeek = fullWeekAvailability.some(
		(day) => day._id === firstItemAvailable
	);

	const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	const weekDayName = (dayName: Date) =>
		locale.includes('en')
			? format(dayName, 'EE', { locale: dateLocale })
			: format(dayName, 'EE', { locale: dateLocale }).slice(0, 3);

	const isColumnFetching = (
		isFetchingNextPage: boolean,
		isFetchingPreviousPage: boolean,
		nextCursor: string | null,
		previousCursor: string | null,
		day: Date
	): boolean => {
		const nextIndex = fullWeekAvailability.findIndex(
			({ _id }) => _id === nextCursor
		);
		const prevIndex = fullWeekAvailability.findIndex(
			({ _id }) => _id === previousCursor
		);

		const nextColumnsToLoad =
			nextIndex >= 0 ? fullWeekAvailability.slice(nextIndex + 1) : [];

		const previousColumnsToLoad =
			prevIndex > 0 ? fullWeekAvailability.slice(0, prevIndex) : [];

		const isNextColumnFetching =
			isFetchingNextPage &&
			nextColumnsToLoad?.some(({ weekDay }) => isSameDay(weekDay, day));

		const isPreviousColumnFetching =
			isFetchingPreviousPage &&
			previousColumnsToLoad.some(({ weekDay }) => isSameDay(weekDay, day));

		if (isNextColumnFetching) {
			return true;
		}

		if (isPreviousColumnFetching) {
			return true;
		}

		return false;
	};

	return {
		weekStart,
		weekDays,
		availabilityDates,
		fullWeekAvailability,
		filteredHoursRange,
		daysOfWeek,
		getSlotsForDayAndHour,
		isLastItemWithinWeek,
		isFirstItemWithinWeek,
		weekDayName,
		firstItemAvailable,
		lastItemAvailable,
		isColumnFetching,
	};
};
