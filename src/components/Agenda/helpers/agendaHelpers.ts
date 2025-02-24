import type { IAvailabilityDate } from '@psycron/api/user/index.types';

export const filterDayHoursByAvailability = (
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

export const getSlotStatus = (
	day: Date,
	hour: string,
	availabilityDates: IAvailabilityDate[]
) => {
	const weekDay = day.toDateString();

	const availabilityForDay = availabilityDates.find((dateObj) => {
		const availabilityDate = new Date(dateObj.date).toDateString();
		return availabilityDate === weekDay;
	});

	if (!availabilityForDay || !availabilityForDay.slots.length) {
		return 'BLOCKED';
	}

	const slot = availabilityForDay.slots.find((slot) => slot.startTime === hour);

	return slot ? slot.status : 'BLOCKED';
};

export const isSelectedDay = (selectedDay?: Date, day?: Date) => {
	if (!selectedDay || !day) return false;

	return (
		selectedDay.getDate() === day.getDate() &&
		selectedDay.getMonth() === day.getMonth() &&
		selectedDay.getFullYear() === day.getFullYear()
	);
};
