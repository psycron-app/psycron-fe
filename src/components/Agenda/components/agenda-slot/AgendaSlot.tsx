import { useTranslation } from 'react-i18next';
import { Icon } from '@mui/material';
import {
	Available,
	ClockIn,
	Lock,
	UnAvailable,
} from '@psycron/components/icons';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { isCurrentDay } from '@psycron/utils/variables';

import { StyledGridSlots, StyledSlotsWrapper } from './AgendaSlot.styles';
import type { IAgendaSlot } from './AgendaSlot.types';

export const AgendaSlot = ({
	day,
	hour,
	slotStatus,
	status,
	clickedSlot,
	beforeToday,
	handleSlotClick,
	isTherapist,
}: IAgendaSlot) => {
	const { t } = useTranslation();

	const isToday = isCurrentDay(new Date());

	const slotKey = `${day.toDateString()}_${hour}`;

	const translateSlotStatus = (status: string) => {
		return t(`page.availability.agenda.status.${status.toLowerCase()}`, status);
	};

	const getStatusIcon = (
		status: string,
		slotKey: string,
		clickedSlot: string | null,
		isTherapist: boolean
	) => {
		if (slotKey === clickedSlot) {
			return <ClockIn />;
		}

		switch (status.toLowerCase()) {
			case 'available':
				return <Available />;
			case 'booked':
				return <UnAvailable />;
			case 'unavailable':
				return !isTherapist ? <Lock /> : null;
			default:
				return null;
		}
	};

	const renderTooltip = (
		slotStatus: string,
		translatedStatus: string,
		slotKey: string,
		clickedSlot: string | null,
		isToday: boolean
	) => {
		if (isToday) {
			return (
				<Tooltip
					title={
						slotStatus ? translatedStatus : translateSlotStatus('unavailable')
					}
				>
					<Icon>
						{getStatusIcon(slotStatus, slotKey, clickedSlot, isTherapist)}
					</Icon>
				</Tooltip>
			);
		}

		if (!slotStatus || slotStatus.toLowerCase() === 'default') {
			return (
				<Tooltip title={translateSlotStatus('unavailable')}>
					<Icon />
				</Tooltip>
			);
		}

		return (
			<Tooltip title={translatedStatus}>
				<Icon>
					{getStatusIcon(slotStatus, slotKey, clickedSlot, isTherapist)}
				</Icon>
			</Tooltip>
		);
	};

	const translatedStatus = translateSlotStatus(status);

	return (
		<StyledGridSlots
			item
			xs={1}
			status={status}
			onClick={handleSlotClick}
			isBeforeToday={beforeToday}
			isTherapist={isTherapist}
		>
			<StyledSlotsWrapper>
				{renderTooltip(
					slotStatus,
					translatedStatus,
					slotKey,
					clickedSlot,
					isToday
				)}
			</StyledSlotsWrapper>
		</StyledGridSlots>
	);
};
