import { StatusEnum } from '@psycron/api/user/availability/index.types';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { format, isSameDay } from 'date-fns';

import { BookedSlot } from '../booked-slot/BookedSlot';

import {
	BigCalendarBodyGrid,
	BigCalendarBodyWrapper,
	BigCalendarHour,
	BigCalendarSlot,
	StyledTableSkeleton,
} from './BigCalendarBody.styles';
import type { IBigCalendarBody } from './BigCalendarBody.types';

export const BigCalendarBody = ({
	totalColumns,
	includeHourColumn,
	daysOfWeek,
	filteredHoursRange,
	getSlotsForDayAndHour,
	isLoading,
	nextCursor,
	previousCursor,
	isColumnFetching,
	isFetchingNextPage,
	isFetchingPreviousPage,
	onClick,
	consultationDuration,
	mode,
}: IBigCalendarBody) => {
	const { therapistId } = useUserDetails();

	const calculateEndTime = (
		startTime: string,
		consultationDuration: number
	): string => {
		const [hours, minutes] = startTime.split(':').map(Number);

		const startDate = new Date();
		startDate.setHours(hours, minutes, 0, 0);

		const endDate = new Date(
			startDate.getTime() + consultationDuration * 60000
		);

		return format(endDate, 'HH:mm');
	};
	const today = new Date();

	const getEmptySlot = (hour: string, consultationDuration: number): ISlot => ({
		startTime: hour,
		endTime: calculateEndTime(hour, consultationDuration),
		status: StatusEnum.EMPTY,
		_id: null,
	});

	return (
		<>
			{isLoading ? (
				<BigCalendarBodyWrapper>
					{Array.from({ length: 12 }).map((_, rowIndex) => {
						const delay = `${rowIndex * 100}ms`;

						return (
							<BigCalendarBodyGrid
								key={`skeleton-row-${rowIndex}`}
								container
								columns={totalColumns}
								columnSpacing={1}
								includeHourColumn={includeHourColumn}
							>
								{includeHourColumn && (
									<BigCalendarHour>
										<StyledTableSkeleton style={{ animationDelay: delay }} />
									</BigCalendarHour>
								)}

								{Array.from({ length: daysOfWeek.length }).map(
									(_, colIndex) => (
										<BigCalendarSlot
											key={`skeleton-${rowIndex}-${colIndex}`}
											isToday={false}
										>
											<StyledTableSkeleton style={{ animationDelay: delay }} />
										</BigCalendarSlot>
									)
								)}
							</BigCalendarBodyGrid>
						);
					})}
				</BigCalendarBodyWrapper>
			) : (
				<BigCalendarBodyWrapper>
					{filteredHoursRange.map((hour) => (
						<BigCalendarBodyGrid
							key={hour}
							container
							columns={totalColumns}
							columnSpacing={1}
							includeHourColumn={includeHourColumn}
						>
							{includeHourColumn && (
								<BigCalendarHour variant='caption'>{hour}</BigCalendarHour>
							)}

							{daysOfWeek.map((day, index) => {
								const delay = `${index * 100}ms`;
								const { slots, dateId } = getSlotsForDayAndHour(day, hour);

								const bookedSlot =
									mode !== 'book' &&
									slots.find((slot) => slot.status === 'BOOKED');

								const slot = slots?.find((slot: { startTime: string }) => {
									return slot.startTime === hour;
								});

								const foundSlot =
									slot ?? getEmptySlot(hour, consultationDuration);

								const status = slots.length > 0 ? slots[0].status : null;

								const selectedSlotDetails = {
									availabilityDayId: dateId,
									date: day,
									slot: foundSlot,
									patientId: foundSlot?.patientId,
								};

								const isLoading = isColumnFetching(
									isFetchingNextPage,
									isFetchingPreviousPage,
									nextCursor,
									previousCursor,
									day
								);

								return (
									<BigCalendarSlot
										key={format(day, 'yyyy-MM-dd') + hour}
										isToday={isSameDay(day, today)}
										status={status}
										onClick={() => onClick(selectedSlotDetails, mode)}
										mode={mode}
									>
										{isLoading ? (
											<StyledTableSkeleton style={{ animationDelay: delay }} />
										) : bookedSlot ? (
											<BookedSlot
												therapistId={therapistId}
												patientId={bookedSlot.patientId}
												startTime={bookedSlot.startTime}
												endTime={bookedSlot.endTime}
											/>
										) : null}
									</BigCalendarSlot>
								);
							})}
						</BigCalendarBodyGrid>
					))}
				</BigCalendarBodyWrapper>
			)}
		</>
	);
};
