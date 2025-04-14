import ct from 'countries-and-timezones';
import type { Locale } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import type { TFunction } from 'i18next';

const getCountryFromTimeZone = (
	timeZone: string,
	languageCode: string
): string => {
	const tzInfo = ct.getTimezone(timeZone);
	const countryCode = tzInfo?.countries?.[0];

	if (!countryCode) return timeZone;

	try {
		const display = new Intl.DisplayNames([languageCode], { type: 'region' });
		return display.of(countryCode) ?? countryCode;
	} catch {
		return countryCode;
	}
};

export const getFormattedTimeLabels = (
	date: Date,
	startTime: string,
	endTime: string,
	dateLocale: Locale,
	therapistTZ: string,
	patientTZ: string,
	t: TFunction,
	currentView: 'therapist' | 'patient'
) => {
	const getLabel = (tz: string, type: 'therapist' | 'patient') => {
		const [startH, startM] = startTime.split(':').map(Number);
		const [endH, endM] = endTime.split(':').map(Number);

		const languageCode = dateLocale.code;

		const start = new Date(date);
		start.setHours(startH, startM, 0, 0);

		const end = new Date(date);
		end.setHours(endH, endM, 0, 0);

		const startZoned = toZonedTime(start, tz);
		const endZoned = toZonedTime(end, tz);

		const dateStr = format(startZoned, 'dd/MM/yyyy', { locale: dateLocale });
		const startStr = format(startZoned, 'HH:mm', { locale: dateLocale });
		const endStr = format(endZoned, 'HH:mm', { locale: dateLocale });

		const timeRange = t('globals.time-range.time-range-date', {
			date: dateStr,
			start: startStr,
			end: endStr,
		});

		const suffixKey =
			currentView === type
				? 'your-time'
				: type === 'therapist'
					? 'therapist-time'
					: 'patient-time';

		const suffix = t(`globals.time-range.${suffixKey}`);

		const tooltip = getCountryFromTimeZone(tz, languageCode);

		return {
			label: `${timeRange} - ${suffix}`,
			tooltip,
		};
	};

	const therapist = getLabel(therapistTZ, 'therapist');
	const patient = getLabel(patientTZ, 'patient');

	return {
		therapistLabel: therapist.label,
		therapistTooltip: therapist.tooltip,
		patientLabel: patient.label,
		patientTooltip: patient.tooltip,
	};
};
