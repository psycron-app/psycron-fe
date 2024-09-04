import { useParams } from 'react-router-dom';
import { Text } from '@psycron/components/text/Text';
import { generateWeekDays } from '@psycron/utils/variables';
import { format, isToday } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { AgendaTopRow, AgendaTopRowItem, Slot } from './WeekDays.styles';
import type { IWeekDays } from './WeekDays.types';

export const WeekDays = ({ selectedWeek, isSimple, dayHours }: IWeekDays) => {
	const { locale } = useParams<{ locale: string }>();
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const weekDays = generateWeekDays(dateLocale);

	const displayWeek = selectedWeek?.length ? selectedWeek : weekDays;

	return (
		<>
			{displayWeek.map((day, dayIndex) => {
				const isCurrentDay = isToday(day);
				return (
					<AgendaTopRowItem
						key={`day-${dayIndex}`}
						isCurrentDay={!isSimple && isCurrentDay}
					>
						<AgendaTopRow isSimple={isSimple}>
							<Text>{format(day, 'EE')}</Text>
							{!isSimple ? <Text>{format(day, 'd')}</Text> : null}
						</AgendaTopRow>
						{dayHours.map((_, hourIndex) => (
							<Slot key={`slot-${dayIndex}-${hourIndex}`} isSimple={isSimple} />
						))}
					</AgendaTopRowItem>
				);
			})}
		</>
	);
};
