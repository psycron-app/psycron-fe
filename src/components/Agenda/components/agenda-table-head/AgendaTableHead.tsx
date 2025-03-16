import { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { StickyCell } from './AgendaTableHead.styles';
import type { IAgendaTableHeadProps } from './AgendaTableHead.types';
export const AgendaTableHead = forwardRef<
	HTMLTableSectionElement,
	IAgendaTableHeadProps
>(({ nextCursor, fullWeekAvailability, previousCursor, previousRef }, ref) => {
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
						const lastDay = new Date(date);

						const isNextCursorInView = availabilityDayId === nextCursor;

						const isPreviousCursorInView = availabilityDayId === previousCursor;

						const uniqueKey = availabilityDayId
							? availabilityDayId
							: `temp-key-${index}`;

						return (
							<TableCell
								key={uniqueKey}
								align='center'
								ref={
									isNextCursorInView
										? ref
										: isPreviousCursorInView
											? previousRef
											: null
								}
							>
								<Text fontWeight={600}>
									{weekDayName(weekDay).toUpperCase()}
								</Text>
								<Text>{format(lastDay, 'd')}</Text>
							</TableCell>
						);
					}
				)}
			</TableRow>
		</TableHead>
	);
});

AgendaTableHead.displayName = 'AgendaTableHead';
