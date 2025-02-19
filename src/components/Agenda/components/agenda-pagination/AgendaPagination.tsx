import { useTranslation } from 'react-i18next';
import {
	ChevronLeft,
	ChevronRight,
	Month,
	Today,
} from '@psycron/components/icons';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';

import {
	IcontMonthWrapper,
	IcontTodayWrapper,
	StyledAgendaPagination,
	StyledPgButtonWrapper,
} from './AgendaPagination.styles';
import type { IAgendaPaginationProps } from './AgendaPagination.types';

export const AgendaPagination = ({
	onGoToNextWeek,
	onGoToPreviousWeek,
	onGoToToday,
	onGoToMonthView,
	disablePrevious,
	disableNext,
}: IAgendaPaginationProps) => {
	const { t } = useTranslation();

	return (
		<>
			<StyledAgendaPagination>
				<IcontTodayWrapper>
					<Tooltip title={t('components.agenda.today')} onClick={onGoToToday}>
						<Today />
					</Tooltip>
				</IcontTodayWrapper>
				<StyledPgButtonWrapper>
					<Tooltip
						disabled={disablePrevious}
						title={t('components.agenda.previous-week')}
						onClick={!disablePrevious ? onGoToPreviousWeek : undefined}
					>
						<ChevronLeft />
					</Tooltip>
					<Tooltip
						title={t('components.agenda.next-week')}
						onClick={!disableNext ? onGoToNextWeek : undefined}
					>
						<ChevronRight />
					</Tooltip>
				</StyledPgButtonWrapper>
				<IcontMonthWrapper>
					<Tooltip
						title={t('components.agenda.month')}
						onClick={onGoToMonthView}
					>
						<Month />
					</Tooltip>
				</IcontMonthWrapper>
			</StyledAgendaPagination>
		</>
	);
};
