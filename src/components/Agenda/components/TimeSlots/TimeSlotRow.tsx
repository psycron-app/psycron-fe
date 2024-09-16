import { Controller, useFormContext } from 'react-hook-form';
import { Text } from '@psycron/components/text/Text';
import { generateWeekDays } from '@psycron/utils/variables';
import { format, isToday } from 'date-fns';

import {
	HourCollWrapper,
	SlotBox,
	StyledDaySlots,
	StyledHourColl,
} from './TimeSlotRow.styles';
import type {
	ITimeSlotsRow,
	IWeekdaysNames,
	OnChange,
	SelectedSlots,
} from './TimeSlotRow.types';

export const TimeSlotsRow = ({
	hour,
	availableWeekdays,
	isSimple,
}: ITimeSlotsRow) => {
	const { control, watch } = useFormContext();

	const watchedSelectedSlots = watch('selectedSlots');

	const weekDays = generateWeekDays();

	const isDayAvailable = (day: Date) => {
		const dayName = format(day, 'EEEE');
		return availableWeekdays.some(
			(weekday: { dayName: string }) => weekday.dayName === dayName
		);
	};

	const slotIdFormat = (day: Date, time: string) => {
		const dayName = format(day, 'EEEE');
		return { dayName, time };
	};

	const isSlotSelected = (dayName: string, time: string) => {
		const day = watchedSelectedSlots?.find(
			(d: { dayName: string }) => d.dayName === dayName
		);
		return day ? day.slots.includes(time) : false;
	};

	const handleSlotClick = (
		dayName: IWeekdaysNames,
		time: string,
		value: SelectedSlots = [],
		onChange: OnChange
	) => {
		const currentDay = value.find((d) => d.dayName === dayName);
		let updatedSlots = [...value];

		if (currentDay) {
			if (currentDay.slots.includes(time)) {
				updatedSlots = updatedSlots.map((d) =>
					d.dayName === dayName
						? { ...d, slots: d.slots.filter((slot: string) => slot !== time) }
						: d
				);
			} else {
				updatedSlots = updatedSlots.map((d) =>
					d.dayName === dayName ? { ...d, slots: [...d.slots, time] } : d
				);
			}
		} else {
			updatedSlots.push({ dayName, slots: [time] });
		}

		onChange(updatedSlots.filter((d) => d.slots.length > 0));
	};

	return (
		<Controller
			name='selectedSlots'
			control={control}
			render={({ field: { value, onChange } }) => (
				<>
					<StyledHourColl item xs={1}>
						<HourCollWrapper>
							<Text variant='caption'>{hour}</Text>
						</HourCollWrapper>
					</StyledHourColl>
					{weekDays.map((day, index) => {
						const { dayName, time } = slotIdFormat(day, hour);
						const isCurrentDay = isToday(day);
						const dayAvailable = isDayAvailable(day);

						const isSelected = isSlotSelected(dayName, time);

						return (
							<StyledDaySlots key={`day-${index}`} item xs={1}>
								<SlotBox
									isSelected={isSelected}
									disabled={!dayAvailable}
									isCurrentDay={!isSimple && isCurrentDay}
									onClick={() =>
										handleSlotClick(
											dayName as IWeekdaysNames,
											time,
											value,
											onChange
										)
									}
								/>
							</StyledDaySlots>
						);
					})}
				</>
			)}
		/>
	);
};
