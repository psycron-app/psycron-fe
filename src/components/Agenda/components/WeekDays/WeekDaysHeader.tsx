import { useParams } from 'react-router-dom';
import { Text } from '@psycron/components/text/Text';
import { generateWeekDays } from '@psycron/utils/variables';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import {
	THEmpty,
	THWeekDays,
	WeekDaysHeaderGrid,
	WeekDayWrapper,
} from './WeekDaysHeader.styles';
import type { IWeekDaysHeader } from './WeekDaysHeader.types';

export const WeekDaysHeader = ({ isSimple }: IWeekDaysHeader) => {
	const { locale } = useParams<{ locale: string }>();
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const daysOfWeek = generateWeekDays();

	return (
		<WeekDaysHeaderGrid container spacing={2} columns={8}>
			<THEmpty item xs={1} />
			{daysOfWeek.map((day, index) => (
				<THWeekDays key={`header-${index}`} item xs={1}>
					<WeekDayWrapper>
						<Text>{format(day, 'EE', { locale: dateLocale })}</Text>
						{!isSimple ? <Text>{format(day, 'd')}</Text> : null}
					</WeekDayWrapper>
				</THWeekDays>
			))}
		</WeekDaysHeaderGrid>
	);
};
