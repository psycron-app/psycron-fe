import { useState } from 'react';
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
	isSelectedDay,
	isFirstSlot,
	isLastSlot,
}: IAgendaSlot) => {
	const { t } = useTranslation();
	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	const isToday = isCurrentDay(new Date());

	const slotKey = `${day.toDateString()}_${hour}`;

	const disableTooltip = !isTherapist && slotStatus === 'BLOCKED';

	const handleMouseEnter = () => {
		if (!disableTooltip) setIsTooltipOpen(true);
	};

	const handleMouseLeave = () => {
		setIsTooltipOpen(false);
	};

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

		isTherapist: boolean
	) => {
		const getTooltipTitle = () => {
			if (!slotStatus || slotStatus.toLowerCase() === 'default') {
				return translateSlotStatus('unavailable');
			}
			return slotStatus ? translatedStatus : translateSlotStatus('unavailable');
		};

		return (
			<Tooltip
				title={getTooltipTitle()}
				disableInteractive={disableTooltip}
				disabled={disableTooltip}
				open={isTooltipOpen}
			>
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
			isSelectedDay={isSelectedDay}
			isFirstSlot={isFirstSlot}
			isLastSlot={isLastSlot}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<StyledSlotsWrapper
				disableInteractivity={disableTooltip}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
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
