import type { IAvailabilityDate } from '@psycron/api/user/index.types';

export const filteredHoursFromRange = (
	dayHours: string[],
	availabilityDateObjct: IAvailabilityDate
): string[] => {
	const availableTimes: string[] = [];

	availabilityDateObjct.slots?.forEach((slot) => {
		if (slot.status === 'AVAILABLE') {
			availableTimes.push(slot.startTime);
		}
	});

	const filteredDayHours = dayHours.filter((hour) =>
		availableTimes.includes(hour)
	);

	return filteredDayHours;
};

export const filteredAvailabilityBasedOnRange = (
	dayHours: string[],
	availabilityDates?: IAvailabilityDate[]
): {
	filteredAvailabilityItem: IAvailabilityDate[];
	filteredHoursRange: string[];
} => {
	if (!availabilityDates)
		return { filteredHoursRange: [], filteredAvailabilityItem: [] };

	// Filtramos apenas os dias que possuem slots dentro do range de `dayHours`
	const filteredAvailabilityItem = availabilityDates
		.map((availabilityDate) => {
			const filteredSlots = availabilityDate.slots.filter((slot) =>
				dayHours.includes(slot.startTime)
			);

			return filteredSlots.length > 0
				? { ...availabilityDate, slots: filteredSlots }
				: null;
		})
		.filter(Boolean) as IAvailabilityDate[]; // Remove os `null`

	// Criamos um conjunto único de horários para evitar repetições
	const filteredHoursRange = Array.from(
		new Set(
			filteredAvailabilityItem.flatMap((availabilityDate) =>
				availabilityDate.slots.map((slot) => slot.startTime)
			)
		)
	).sort(); // Ordena os horários para manter a estrutura correta

	return { filteredHoursRange, filteredAvailabilityItem };
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
