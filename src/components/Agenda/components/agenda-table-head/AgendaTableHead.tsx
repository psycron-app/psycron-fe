import { useParams } from 'react-router-dom';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { StickyCell } from './AgendaTableHead.styles';
import type { IAgendaTableHeadProps } from './AgendaTableHead.types';

export const AgendaTableHead = ({
	fullWeekAvailability,
}: IAgendaTableHeadProps) => {
	const { locale } = useParams<{ locale: string }>();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const weekDayName = (dayName: string) => {
		return locale.includes('en')
			? format(dayName, 'EE', { locale: dateLocale })
			: format(dayName, 'EE', { locale: dateLocale }).slice(0, 3);
	};

	const currentMonth = format(fullWeekAvailability.at(0)?.date, 'MMM', {
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
				{fullWeekAvailability.map(
					({ weekDay, _id: availabilityDayId, date }, index) => {
						const displayDay = format(date, 'd');

						const uniqueKey = availabilityDayId
							? availabilityDayId
							: `temp-key-${index}`;

						return (
							<TableCell key={uniqueKey} align='center'>
								<Text fontWeight={600}>
									{weekDayName(weekDay).toUpperCase()}
								</Text>
								<Text>{displayDay}</Text>
							</TableCell>
						);
					}
				)}
			</TableRow>
		</TableHead>
	);
};
