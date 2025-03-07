import type { Event } from 'react-big-calendar';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';

// import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
	getDay,
	locales,
});

interface CalendarEvent {
	end: Date;
	id: string;
	start: Date;
	title: string;
}

// Função para transformar os dados em eventos do calendário
export const transformAvailabilityToEvents = (data: any): CalendarEvent[] => {
	return data.availabilityDates.flatMap((day: any) => {
		return day.slots.map((slot: any) => {
			const startDate = new Date(day.date);
			const [startHour, startMinute] = slot.startTime.split(':').map(Number);
			const [endHour, endMinute] = slot.endTime.split(':').map(Number);

			return {
				id: slot._id,
				title: 'Available',
				start: new Date(
					startDate.getFullYear(),
					startDate.getMonth(),
					startDate.getDate(),
					startHour,
					startMinute
				),
				end: new Date(
					startDate.getFullYear(),
					startDate.getMonth(),
					startDate.getDate(),
					endHour,
					endMinute
				),
			};
		});
	});
};

export interface AvailabilityCalendarProps {
	events: Event[];
}

const AvailabilityCalendar = ({ events }: AvailabilityCalendarProps) => {
	return (
		<div style={{ height: 600 }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				defaultView={Views.WEEK}
				views={['week']}
				style={{ backgroundColor: 'white' }}
			/>
		</div>
	);
};

export default AvailabilityCalendar;
