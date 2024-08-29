import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Agenda } from '@psycron/components/Agenda/Agenda';
import { FloatingButton } from '@psycron/components/button/Floating/FloatingButton';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { Calendar as CalendarIcon } from '@psycron/components/icons';
import {
	eachDayOfInterval,
	endOfWeek,
	startOfToday,
	startOfWeek,
} from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

export const CalendarPage = () => {
	const { locale } = useParams<{ locale: string }>();
	const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

	const today = startOfToday();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const generateWeek = (choosenDay: Date) => {
		return {
			start: startOfWeek(choosenDay, { locale: dateLocale }),
			end: endOfWeek(choosenDay, { locale: dateLocale }),
		};
	};

	const currentWeek = eachDayOfInterval(generateWeek(today));

	const [selectedWeek, setSelectedWeek] = useState<Date[]>(currentWeek);

	const handleDayClick = (day: Date) => {
		const daysOfSelectedWeek = eachDayOfInterval(generateWeek(day));

		setSelectedWeek(daysOfSelectedWeek);
	};

	const handleFloatingButtonClick = () => {
		setIsCalendarVisible((prev) => !prev);
	};

	const handleOutsideClick = () => {
		setIsCalendarVisible(false);
	};

	return (
		<>
			<FloatingButton
				isVisible={isCalendarVisible}
				handleClick={handleFloatingButtonClick}
				handleOutsideClick={handleOutsideClick}
				content={
					isCalendarVisible && (
						<Calendar
							handleDayClick={handleDayClick}
							dateLocale={dateLocale}
							today={today}
						/>
					)
				}
			>
				<CalendarIcon />
			</FloatingButton>

			<Agenda selectedWeek={selectedWeek} />
		</>
	);
};
