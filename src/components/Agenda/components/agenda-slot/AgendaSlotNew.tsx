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
	RowHighlight,
	SlotWrapper,
	StyledSlotHoverable,
} from './AgendaSlotNew.styles';
import type { IAgendaSlotProps } from './AgendaSlotNew.types';

export const AgendaSlotNew = ({
	slot,
	isTherapistView,
	hoveredHour,
	isSlotDetailsOpen,
	isLastInRow,
	onClick,
	onMouseEnter,
	onMouseLeave,
}: IAgendaSlotProps) => {
	const { t } = useTranslation();

	const getStatusIcon = (
		status: ISlotStatus,
		isTherapistView: boolean,
		isSlotDetailsOpen: boolean
	) => {
		if (!status) return;

		if (isSlotDetailsOpen) {
			return <ClockIn />;
		}

		switch (status) {
			case 'AVAILABLE':
				return <Available />;
			case 'BOOKED':
				return <UnAvailable />;
			case 'BLOCKED':
				return !isTherapistView ? <Lock /> : null;
			default:
				return null;
		}
	};

	const translatedStatus = (status?: ISlotStatus, isTherapistView?: boolean) =>
		status !== undefined
			? t(`page.availability.agenda.status.${status?.toLowerCase()}`, status)
			: isTherapistView
				? 'empty'
				: 'not available';

	const isHighlighted = slot?.startTime === hoveredHour;

	return (
		<SlotWrapper
			isHighlighted={isHighlighted}
			isLastInRow={isLastInRow}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{!isHighlighted ? (
				<RowHighlight isHighlighted={isHighlighted} isLastInRow={isLastInRow} />
			) : null}
			<StyledSlotHoverable
				title={translatedStatus(slot?.status, true)}
				isHighlighted={isHighlighted}
				isLastInRow={isLastInRow}
				status={slot?.status}
			>
				<Text variant='caption' display='flex' alignItems='center'>
					{getStatusIcon(slot?.status, isTherapistView, isSlotDetailsOpen)}
				</Text>
			</StyledSlotHoverable>
		</SlotWrapper>
	);
};
