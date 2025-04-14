import { useEffect, useState } from 'react';
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

	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [startSlot, setStartSlot] = useState<{
		dayName: IWeekdaysNames;
		time: string;
	} | null>(null);

	const watchedSelectedSlots = watch('selectedSlots');

	const weekDays = generateWeekDays();

	useEffect(() => {
		const handleTouchMove = (event: TouchEvent) => {
			if (isDragging) {
				event.preventDefault();
			}
		};

		document.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		});

		return () => {
			document.removeEventListener('touchmove', handleTouchMove);
		};
	}, [isDragging]);

	const isDayAvailable = (day: Date) => {
		const dayName = format(day, 'EEEE');
		return availableWeekdays.some(
			(weekday: { dayName: string }) => weekday.dayName === dayName
		);
	};

	const slotIdFormat = (day: Date, time: string) => {
		const dayName = format(day, 'EEEE') as IWeekdaysNames;
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

	const handleStart = (
		dayName: IWeekdaysNames,
		time: string,
		value: SelectedSlots = [],
		onChange: OnChange
	) => {
		setIsDragging(true);
		setStartSlot({ dayName, time });
		handleSlotClick(dayName, time, value, onChange);
	};

	const handleMove = (
		dayName: IWeekdaysNames,
		time: string,
		value: SelectedSlots = [],
		onChange: OnChange
	) => {
		if (isDragging && startSlot) {
			const startIndex = weekDays.findIndex(
				(day) => format(day, 'EEEE') === startSlot.dayName
			);
			const endIndex = weekDays.findIndex(
				(day) => format(day, 'EEEE') === dayName
			);
			const isSameHour = startSlot.time === time;

			const minIndex = Math.min(startIndex, endIndex);
			const maxIndex = Math.max(startIndex, endIndex);

			for (let i = minIndex; i <= maxIndex; i++) {
				const currentDayName = format(weekDays[i], 'EEEE') as IWeekdaysNames;
				handleSlotClick(
					currentDayName,
					isSameHour ? startSlot.time : time,
					value,
					onChange
				);
			}
		}
	};

	const handleEnd = () => {
		setIsDragging(false);
		setStartSlot(null);
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
									onMouseDown={() =>
										handleStart(dayName, time, value, onChange)
									}
									onMouseEnter={() =>
										handleMove(dayName, time, value, onChange)
									}
									onMouseUp={handleEnd}
								/>
							</StyledDaySlots>
						);
					})}
				</>
			)}
		/>
	);
};
