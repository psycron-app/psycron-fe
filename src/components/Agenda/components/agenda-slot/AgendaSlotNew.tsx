import { useTranslation } from 'react-i18next';
import {
	Available,
	ClockIn,
	Lock,
	UnAvailable,
} from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';

import { SlotWrapper, StyledSlotHoverable } from './AgendaSlotNew.styles';
import type { IAgendaSlotProps } from './AgendaSlotNew.types';

export const AgendaSlotNew = ({
	slot,
	isTherapistView,
	isSlotDetailsOpen,
	isLastInRow,
	onClick,
	onMouseEnter,
	onMouseLeave,
	isHighlightedColumn,
	isHighlightedRow,
	isLastInColumn,
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

	return (
		<SlotWrapper
			isHighlightedRow={isHighlightedRow}
			isHighlightedColumn={isHighlightedColumn}
			isLastInRow={isLastInRow}
			isLastInColumn={isLastInColumn}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<StyledSlotHoverable
				title={translatedStatus(slot?.status, true)}
				isHighlightedRow={isHighlightedRow}
				isHighlightedColumn={isHighlightedColumn}
				isLastInRow={isLastInRow}
				isLastInColumn={isLastInColumn}
				status={slot?.status}
			>
				<Text variant='caption' display='flex' alignItems='center'>
					{getStatusIcon(slot?.status, isTherapistView, isSlotDetailsOpen)}
				</Text>
			</StyledSlotHoverable>
		</SlotWrapper>
	);
};
