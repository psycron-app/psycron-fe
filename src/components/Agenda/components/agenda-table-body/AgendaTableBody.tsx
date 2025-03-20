import { useTranslation } from 'react-i18next';
import {
	Available,
	ClockIn,
	Lock,
	UnAvailable,
} from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import type {
	ISlot,
	ISlotStatus,
} from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { format } from 'date-fns';

import {
	AgendaBodyRow,
	AgendaCellBody,
	AgendaTableBodyWrapper,
	StickyCell,
	StyledSlotHoverable,
	StyledTableSkeleton,
} from './AgendaTableBody.styles';
import type { IAgendaTableBodyProps } from './AgendaTableBody.type';

export const AgendaTableBody = ({
	filteredHoursRange,
	fullWeekAvailability,
	mode,
	onClick,
	isLoading,
	nextCursor,
	previousCursor,
	isFetchingNextPage,
	isFetchingPreviousPage,
	consultationDuration,
}: IAgendaTableBodyProps) => {
	const { t } = useTranslation();

	const getStatusIcon = (status?: ISlotStatus, isSlotDetailsOpen?: boolean) => {
		if (!status) return null;
		if (isSlotDetailsOpen) return <ClockIn />;

		const icons = {
			AVAILABLE: <Available />,
			BOOKED: <UnAvailable />,
			BLOCKED: mode === 'edit' ? <Lock /> : null,
			ONHOLD: <></>,
			CANCELLED: <></>,
			EMPTY: <></>,
		};

		return icons[status] ?? null;
	};

	const translatedStatus = (status?: ISlotStatus) =>
		status
			? t(`page.availability.agenda.status.${status.toLowerCase()}`, status)
			: mode === 'edit'
				? 'empty'
				: 'not available';

	const skeletonRows = 8;
	const skeletonCols = 7;

	const nextCursorIndex = fullWeekAvailability.findIndex(
		({ _id }) => _id === nextCursor
	);
	const previousCursorIndex = fullWeekAvailability.findIndex(
		({ _id }) => _id === previousCursor
	);

	const nextColumnsToLoad =
		nextCursorIndex >= 0 ? fullWeekAvailability.slice(nextCursorIndex + 1) : [];

	const previousColumnsToLoad =
		previousCursorIndex > 0
			? fullWeekAvailability.slice(0, previousCursorIndex)
			: [];

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

	const getEmptySlot = (hour: string, consultationDuration: number): ISlot => ({
		startTime: hour,
		endTime: calculateEndTime(hour, consultationDuration),
		status: 'EMPTY',
		_id: null,
	});

	return (
		<>
			<AgendaTableBodyWrapper>
				{isLoading
					? Array.from({ length: skeletonRows }).map((_, rowIndex) => {
							const delay = `${rowIndex * 100}ms`;

							return (
								<AgendaBodyRow key={`skeleton-row-${rowIndex}`}>
									<StickyCell align='center'>
										<StyledTableSkeleton style={{ animationDelay: delay }} />
									</StickyCell>

									{Array.from({ length: skeletonCols }).map((_, colIndex) => (
										<AgendaCellBody key={`skeleton-cell-${colIndex}`}>
											<StyledTableSkeleton style={{ animationDelay: delay }} />
										</AgendaCellBody>
									))}
								</AgendaBodyRow>
							);
						})
					: filteredHoursRange?.map((hour, rowIndex) => {
							return (
								<AgendaBodyRow key={rowIndex}>
									<StickyCell align='center'>
										<Text fontSize={'0.8rem'}>{hour}</Text>
									</StickyCell>

									{fullWeekAvailability?.map(
										(
											{
												_id: availabilityDayId,
												slots,
												weekDay: weekDayFromAvailability,
												date,
											},
											index
										) => {
											const delay = `${rowIndex * 100}ms`;

											const slot = slots?.find(
												(slot: { startTime: string }) => {
													return slot.startTime === hour;
												}
											);

											const foundSlot =
												slot ?? getEmptySlot(hour, consultationDuration);

											const selectedSlotDetails = {
												availabilityDayId,
												date,
												slot: foundSlot,
											};

											const uniqueKey =
												availabilityDayId || `temp-key-${index}`;

											const isNextColumnFetching =
												isFetchingNextPage &&
												nextColumnsToLoad?.some(
													({ weekDay }) => weekDay === weekDayFromAvailability
												);

											const isPreviousColumnFetching =
												isFetchingPreviousPage &&
												previousColumnsToLoad.some(
													({ weekDay }) => weekDay === weekDayFromAvailability
												);

											const isColumnFetching =
												isNextColumnFetching || isPreviousColumnFetching;

											return (
												<AgendaCellBody
													key={uniqueKey}
													onClick={() => onClick(selectedSlotDetails, mode)}
												>
													{isColumnFetching ? (
														<StyledTableSkeleton
															style={{ animationDelay: delay }}
														/>
													) : (
														<StyledSlotHoverable
															title={translatedStatus(slot?.status)}
															isHighlightedColumn={false}
															status={slot?.status}
														>
															<Text
																variant='caption'
																display='flex'
																alignItems='center'
															>
																{getStatusIcon(slot?.status, false)}
															</Text>
														</StyledSlotHoverable>
													)}
												</AgendaCellBody>
											);
										}
									)}
								</AgendaBodyRow>
							);
						})}
			</AgendaTableBodyWrapper>
		</>
	);
};
