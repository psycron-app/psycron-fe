import { useParams } from 'react-router-dom';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { format, startOfWeek } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { StickyCell } from './AgendaTableHead.styles';
import type { IAgendaTableHeadProps } from './AgendaTableHead.types';

export const AgendaTableHead = ({
	daySelectedFromCalendar,
	fullWeekAvailability,
}: IAgendaTableHeadProps) => {
	const { locale } = useParams<{ locale: string }>();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const weekDayName = (dayName: string) => {
		return locale.includes('en')
			? format(dayName, 'EE', { locale: dateLocale })
			: format(dayName, 'EE', { locale: dateLocale }).slice(0, 3);
	};

	const startOfWeekDate = startOfWeek(daySelectedFromCalendar, {
		weekStartsOn: 1,
	});

	const currentMonth = format(startOfWeekDate || new Date(), 'MMM', {
		locale: dateLocale,
	});

	return (
		<TableHead>
			<TableRow>
				<StickyCell>
					<Text fontWeight={600} align='center'>
						{currentMonth.toUpperCase()}
					</Text>
					<Text visibility='hidden'>hour</Text>
				</StickyCell>
				{fullWeekAvailability.map(({ weekDay }) => {
					return (
						<TableCell key={weekDay} align='center'>
							<Text fontWeight={600}>{weekDayName(weekDay).toUpperCase()}</Text>
							<Text>{format(weekDay, 'd')}</Text>
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
};
