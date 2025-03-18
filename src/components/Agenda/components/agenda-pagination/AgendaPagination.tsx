import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
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
	mode,
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
					<IconButton onClick={onGoToPreviousWeek} disabled={disablePrevious}>
						<ChevronLeft />
					</IconButton>
					<IconButton onClick={onGoToNextWeek} disabled={disableNext}>
						<ChevronRight />
					</IconButton>
				</StyledPgButtonWrapper>
				<IcontMonthWrapper>
					{mode === 'edit' && (
						<Tooltip
							title={t('components.agenda.month')}
							onClick={onGoToMonthView}
						>
							<Month />
						</Tooltip>
					)}
				</IcontMonthWrapper>
			</StyledAgendaPagination>
		</>
	);
};
