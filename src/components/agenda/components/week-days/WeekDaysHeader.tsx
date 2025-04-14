import { useParams } from 'react-router-dom';
import { Text } from '@psycron/components/text/Text';
import { generateWeekDays } from '@psycron/utils/variables';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import {
	StyledDayName,
	THWeekDays,
	WeekDaysHeaderGrid,
	WeekDayWrapper,
} from './WeekDaysHeader.styles';
import type { IWeekDaysHeader } from './WeekDaysHeader.types';

export const WeekDaysHeader = ({
	isSimple,
	selectedDay,
	onColumnHover,
	onColumnClick,
	hoveredColumnIndex,
}: IWeekDaysHeader) => {
	const { locale } = useParams<{ locale: string }>();
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const daysOfWeek = generateWeekDays(selectedDay);

	const weekDayName = (dayName: Date) => {
		return locale.includes('en')
			? format(dayName, 'EE', { locale: dateLocale })
			: format(dayName, 'EE', { locale: dateLocale }).slice(0, 3);
	};

	const currentMonth = format(selectedDay || new Date(), 'MMM', {
		locale: dateLocale,
	});

	return (
		<WeekDaysHeaderGrid container columns={12}>
			<THWeekDays size={1.5}>
				<WeekDayWrapper>
					<StyledDayName>{currentMonth.toUpperCase()}</StyledDayName>
				</WeekDayWrapper>
			</THWeekDays>
			{daysOfWeek.map((day, index) => (
				<THWeekDays
					key={`header-${index}`}
					fontSize={1.5}
					onMouseEnter={() => onColumnHover(index)}
					onClick={() => onColumnClick(index)}
					isHighlightedColumn={hoveredColumnIndex === index}
				>
					<WeekDayWrapper>
						<StyledDayName>{weekDayName(new Date(day))}</StyledDayName>
						{!isSimple ? <Text>{format(day, 'd')}</Text> : null}
					</WeekDayWrapper>
				</THWeekDays>
			))}
		</WeekDaysHeaderGrid>
	);
};
