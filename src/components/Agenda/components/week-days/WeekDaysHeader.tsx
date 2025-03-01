import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Text } from '@psycron/components/text/Text';
import {
	generateWeekDays,
	generateWeekDaysFromSelected,
} from '@psycron/utils/variables';
import { format } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import {
	MonthSubTitle,
	StyledDayName,
	THWeekDays,
	WeekDaysHeaderGrid,
	WeekDayWrapper,
} from './WeekDaysHeader.styles';
import type { IWeekDaysHeader } from './WeekDaysHeader.types';

export const WeekDaysHeader = ({ isSimple, selectedDay }: IWeekDaysHeader) => {
	const { t } = useTranslation();

	const { locale } = useParams<{ locale: string }>();
	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const daysOfWeek = selectedDay
		? generateWeekDaysFromSelected(selectedDay)
		: generateWeekDays();

	const weekDayName = (dayName: Date) => {
		return locale.includes('en')
			? format(dayName, 'EE', { locale: dateLocale })
			: format(dayName, 'EE', { locale: dateLocale }).slice(0, 3);
	};

	const currentMonth = format(selectedDay || new Date(), 'MMM', {
		locale: dateLocale,
	});

	return (
		<WeekDaysHeaderGrid container spacing={2} columns={8}>
			<THWeekDays item xs={1}>
				<WeekDayWrapper>
					<StyledDayName>{currentMonth.toUpperCase()}</StyledDayName>
					<MonthSubTitle>
						<Text variant='caption'>{t('globals.starts').toUpperCase()}</Text>
					</MonthSubTitle>
				</WeekDayWrapper>
			</THWeekDays>
			{daysOfWeek.map((day, index) => (
				<THWeekDays key={`header-${index}`} item xs={1}>
					<WeekDayWrapper>
						<StyledDayName>{weekDayName(day)}</StyledDayName>
						{!isSimple ? <Text>{format(day, 'd')}</Text> : null}
					</WeekDayWrapper>
				</THWeekDays>
			))}
		</WeekDaysHeaderGrid>
	);
};
