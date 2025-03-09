import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, Grid, Modal } from '@mui/material';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { Agenda } from '@psycron/components/agenda/Agenda';
// import { AgendaTable } from '@psycron/components/agenda/AgendaTable';
import { ShareButton } from '@psycron/components/button/share/ShareButton';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { startOfToday } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { AVAILABILITYWIZARD } from '../urls';

import { StyledPaperModal } from './Dashboard.styled';

export const Dashboard = () => {
	const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();

	const { userDetails } = useUserDetails();

	const dateLocale = locale.includes('en') ? enGB : ptBR;
	const today = startOfToday();

	const [selectedDay, setSelectedDay] = useState<IDateInfo | null>(null);

	const navigate = useNavigate();

	const [isDateClicked, setIsDateClicked] = useState<boolean>(false);

	const {
		availabilityData,
		availabilityDataIsLoading,
		isAvailabilityDatesEmpty,
	} = useAvailability();

	const handleDayClick = useCallback(
		(day: IDateInfo) => {
			setIsDateClicked(true);
			setSelectedDay(day);
		},
		[setIsDateClicked]
	);

	const createAvailabilityLink = () => navigate(`../${AVAILABILITYWIZARD}`);

	const availableDatesArray = availabilityData?.latestAvailability?.dates ?? [];

	return (
		<>
			<Grid container style={{ height: '100%' }}>
				<Grid size={10}>
					<Calendar
						isLoading={availabilityDataIsLoading}
						skeletonProps={{
							onClick: createAvailabilityLink,
							text:
								!availabilityDataIsLoading &&
								availabilityData &&
								isAvailabilityDatesEmpty
									? t(
											'components.dashboard.availability-card.first-availability'
										)
									: '',
						}}
						dateLocale={dateLocale}
						today={today}
						availabilityData={availableDatesArray}
						handleDayClick={(dayInfo) => {
							if (dayInfo && dayInfo.date) {
								handleDayClick(dayInfo);
							}
						}}
					/>
				</Grid>
			</Grid>
			<Modal open={isDateClicked} onClose={() => setIsDateClicked(false)}>
				<StyledPaperModal>
					<Agenda
						daySelectedFromCalendar={selectedDay}
						mode='view'
						therapistId={userDetails?._id}
					/>
					<Box display='flex' justifyContent='flex-end' pt={2}>
						<ShareButton
							titleKey={t(
								'components.share-button.share-infos.availability.title',
								{ therapistName: userDetails?.firstName }
							)}
							textKey={t(
								'components.share-button.share-infos.availability.text'
							)}
							url={`${userDetails?._id}/book-appointment`}
							shareWith={t('components.share-button.share-with-patients')}
						/>
					</Box>
				</StyledPaperModal>
			</Modal>
		</>
	);
};
