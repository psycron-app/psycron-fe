import { useTranslation } from 'react-i18next';
import {
	Available,
	ClockIn,
	Lock,
	UnAvailable,
} from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import {
	AgendaBodyRow,
	AgendaCellBody,
	AgendaTableBodyWrapper,
	StickyCell,
	StyledSlotHoverable,
} from './AgendaTableBody.styles';
import type { IAgendaTableBodyProps } from './AgendaTableBody.type';

export const AgendaTableBody = ({
	filteredHoursRange,
	fullWeekAvailability,
	mode,
	isLoading,
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

	return (
		<>
			<AgendaTableBodyWrapper isLoading={isLoading}>
				{filteredHoursRange.map((hour, rowIndex) => (
					<AgendaBodyRow key={rowIndex}>
						<StickyCell align='center' isLoading={false}>
							<Text fontSize={'0.8rem'}>{hour}</Text>
						</StickyCell>

						{fullWeekAvailability.map(({ _id: availabilityDayId, slots }) => {
							const slot = slots.find((slot: { startTime: string }) => {
								return slot.startTime === hour;
							});

							return (
								<AgendaCellBody key={availabilityDayId} isLoading={isLoading}>
									<StyledSlotHoverable
										title={translatedStatus(slot?.status)}
										isHighlightedColumn={false}
										status={slot?.status}
									>
										<Text variant='caption' display='flex' alignItems='center'>
											{getStatusIcon(slot?.status, false)}
										</Text>
									</StyledSlotHoverable>
								</AgendaCellBody>
							);
						})}
					</AgendaBodyRow>
				))}
			</AgendaTableBodyWrapper>
		</>
	);
};
