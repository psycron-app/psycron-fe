/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { FloatingButton } from '@psycron/components/button/floating/FloatingButton';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { Filter } from '@psycron/components/icons';
import {
	eachDayOfInterval,
	endOfMonth,
	isSunday,
	isWeekend,
	startOfMonth,
	startOfToday,
} from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

export interface IFilterOptions {
	excludeSundays: boolean;
	excludeWeekends: boolean;
	selectAllRemaining: boolean;
}

export const SetAvailabilityPage = () => {
	const today = startOfToday();

	const { locale } = useParams<{ locale: string }>();

	const { register, watch } = useForm();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const [isFiltering, setIsFiltering] = useState<boolean>(false);
	const [filteredDates, setFilteredDates] = useState<Date[]>([]);
	const [selectAllRemaining, setSelectAllRemaining] = useState<boolean>(false);

	const generateCalendarDates = () => {
		const start = startOfMonth(today);
		const end = endOfMonth(today);
		return eachDayOfInterval({ start, end });
	};

	const applyFilters = (dates: Date[], options: IFilterOptions) => {
		const { excludeWeekends, excludeSundays, selectAllRemaining } = options;

		const filteredDates = dates.filter((date) => {
			if (excludeWeekends && isWeekend(date)) return false;
			if (excludeSundays && isSunday(date)) return false;
			// Adicione a lógica para excluir feriados aqui
			return true;
		});

		if (selectAllRemaining) {
			return filteredDates;
		}

		return filteredDates;
	};

	useEffect(() => {
		const options: IFilterOptions = {
			excludeWeekends: watch('excludeWeekends'),
			excludeSundays: watch('excludeSundays'),
			selectAllRemaining: watch('selectAllRemaining'),
		};

		const allDates = generateCalendarDates();
		const result = applyFilters(allDates, options);

		setFilteredDates(result);
		setSelectAllRemaining(options.selectAllRemaining);
	}, [
		watch('excludeWeekends'),
		watch('excludeSundays'),
		watch('selectAllRemaining'),
	]);

	const handleFloatingButtonClick = () => {
		setIsFiltering((prev) => !prev);
	};

	const handleOutsideClick = () => {
		setIsFiltering(false);
	};

	const filters = [
		{ labelKey: 'Exclude weekends', registerKey: 'excludeWeekends' },
		{ labelKey: 'Exclude Sundays', registerKey: 'excludeSundays' },
		{ labelKey: 'Select ramaining dates', registerKey: 'selectAllRemaining' },
		// { labelKey: 'Exclude bank holidays', registerKey: 'excludeHolidays' },
		// { labelKey: 'Exclude per day', registerKey: 'excludePerDay' },
	];

	return (
		<Box width={'100%'} height={'100%'}>
			<FloatingButton
				isVisible={isFiltering}
				handleClick={handleFloatingButtonClick}
				handleOutsideClick={handleOutsideClick}
				content={
					isFiltering && (
						<Box height={'auto'} width={300}>
							{filters.map(({ labelKey, registerKey }, index) => {
								return (
									<Box key={`filter-${registerKey}-${index}`}>
										<Checkbox
											labelKey={labelKey}
											register={register(registerKey)}
										/>
									</Box>
								);
							})}
						</Box>
					)
				}
			>
				<Filter />
			</FloatingButton>
			<Calendar
				dateLocale={dateLocale}
				today={today}
				filteredDates={filteredDates}
				selectAllRemaining={selectAllRemaining}
				isBig
			/>
		</Box>
	);
};
