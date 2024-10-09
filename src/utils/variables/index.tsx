import ReactGA from 'react-ga4';
import type { Locale } from 'date-fns';
import {
	addDays,
	addMinutes,
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	format,
	setHours,
	startOfDay,
	startOfWeek,
} from 'date-fns';
import type { TFunction } from 'i18next';

export * from './env';
export * from './urls';

export const formatDateTime = (
	dateTimeString: string,
	t: TFunction
): string => {
	const date = new Date(dateTimeString);
	return format(
		date,
		t('globals.date-time-format', { format: 'MMMM d, yyyy h:mmaaa' })
	);
};

export const getTimeRemaining = (
	targetDateTime: string,
	t: TFunction,
	paused: boolean
): string => {
	const targetDate = new Date(targetDateTime);
	const currentDate = new Date();

	const days = differenceInDays(targetDate, currentDate);
	const hours = differenceInHours(targetDate, currentDate) % 24;
	const minutes = differenceInMinutes(targetDate, currentDate) % 60;

	const status = paused ? t('globals.paused') : t('globals.in-progress');

	let result = '';
	if (days > 0) {
		result = t('globals.time-remaining.days', { count: days });
	} else if (hours > 0) {
		result = t('globals.time-remaining.hours', { count: hours });
	} else if (minutes > 0) {
		result = t('globals.time-remaining.minutes', { count: minutes });
	} else {
		result = t('globals.time-remaining.less-than-a-minute', {
			status: status,
		});
	}

	return result.trim();
};
export const checkAppointmentTimes = (
	targetDateTime: string,
	appointmentDuration: number
) => {
	const targetDate = new Date(targetDateTime);
	const currentDate = new Date();

	const minutesDifference = differenceInMinutes(targetDate, currentDate);
	const endDate = addMinutes(targetDate, appointmentDuration);

	const isNow = currentDate >= targetDate && currentDate <= endDate;

	return {
		lessThanThirtyMinutes: minutesDifference < 30,
		isNow: isNow,
	};
};

export const scrollToSection = (id: string) => {
	ReactGA.event({
		category: 'User',
		action: 'Click Button',
		value: 10,
		label: `User clicked ${id} header button`,
	});

	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};

export const generateDayHours = () => {
	const hours = Array.from({ length: 24 }).map((_, index) => {
		return format(setHours(startOfDay(new Date()), index), 'HH:mm');
	});
	return hours;
};

export const generateTimeSlots = (duration: number) => {
	const slots = [];
	let currentTime = startOfDay(new Date());

	while (currentTime.getDate() === startOfDay(new Date()).getDate()) {
		slots.push(format(currentTime, 'HH:mm'));
		currentTime = addMinutes(currentTime, duration);
	}

	return slots;
};

export const generateWeekDays = (): Date[] => {
	const start = startOfWeek(new Date());

	const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

	return weekDays;
};

export const generateWeekDaysFromSelected = (referenceDate: Date): Date[] => {
	const start = startOfWeek(referenceDate);

	const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

	return weekDays;
};

export const getWeekDays = (today: Date, dateLocale: Locale) => {
	const start = startOfWeek(today, { locale: dateLocale });
	return Array.from({ length: 7 }).map((_, index) => {
		const day = addDays(start, index);
		return format(day, 'EEEE', { locale: dateLocale }).charAt(0).toUpperCase();
	});
};

export const generateUserTimeZone = () => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatDateTimeToLocale = (
	dateTimeStr: string,
	locale: string
): string => {
	const [datePart, timePart] = dateTimeStr.split('_');

	const date = new Date(`${datePart} ${timePart}`);

	if (isNaN(date.getTime())) {
		throw new Error('Data inválida');
	}

	const formattedTime = new Intl.DateTimeFormat(locale, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}).format(date);

	if (locale === 'en') {
		return `${date.toDateString()} at ${formattedTime}`;
	}

	if (locale === 'pt') {
		const dayOfWeek = new Intl.DateTimeFormat('pt', { weekday: 'long' }).format(
			date
		);
		const formattedDate = `${dayOfWeek} (${date.toLocaleDateString('pt', {
			day: '2-digit',
			month: '2-digit',
		})})`;
		return `${formattedDate} às ${formattedTime}`;
	}

	return new Intl.DateTimeFormat(locale, {
		dateStyle: 'full',
		timeStyle: 'short',
	}).format(date);
};

export const formatSessionDateToLocale = (
	dateString: string,
	locale: string
): string => {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		throw new Error('Data inválida');
	}

	const formattedTime = new Intl.DateTimeFormat(locale, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}).format(date);

	if (locale === 'en') {
		return `${date.toDateString()} at ${formattedTime}`;
	}

	if (locale === 'pt') {
		const dayOfWeek = new Intl.DateTimeFormat('pt', { weekday: 'long' }).format(
			date
		);
		const formattedDate = `${dayOfWeek} (${date.toLocaleDateString('pt', {
			day: '2-digit',
			month: '2-digit',
		})})`;
		return `${formattedDate} às ${formattedTime}`;
	}

	return new Intl.DateTimeFormat(locale, {
		dateStyle: 'full',
		timeStyle: 'short',
	}).format(date);
};
