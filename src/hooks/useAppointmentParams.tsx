import { useParams, useSearchParams } from 'react-router-dom';
import type { IBigCalendarView } from '@psycron/components/calendar/big-calendar/BigCalendar.types';

export const useAppointmentParams = () => {
	const { locale, userId, availabilityDayId } = useParams<{
		availabilityDayId?: string;
		locale: string;
		userId?: string;
	}>();

	const [searchParams] = useSearchParams();

	const selectedDate = searchParams.get('date') ?? undefined;
	const selectedSlotId = searchParams.get('slot') ?? undefined;

	const mode = (availabilityDayId ? 'edit' : 'book') as IBigCalendarView;

	return {
		locale,
		userId,
		availabilityDayId,
		selectedDate,
		selectedSlotId,
		mode,
	};
};
