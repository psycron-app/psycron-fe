import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Modal } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
// import { AgendaTable } from '@psycron/components/agenda/AgendaTable';
import { ShareButton } from '@psycron/components/button/share/ShareButton';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { useDashboardLogic } from '@psycron/hooks/useDashboardLogic';

import { AVAILABILITYWIZARD } from '../urls';

import { StyledPaperModal } from './Dashboard.styled';

export const Dashboard = () => {
	const { t } = useTranslation();

	const navigate = useNavigate();
	const {
		userDetails,
		dateLocale,
		today,
		isDateClicked,
		selectedDay,
		setIsDateClicked,
		handleDayClick,
	} = useDashboardLogic();

	const { availabilityData, availabilityDataIsLoading, isAvailabilityEmpty } =
		useAvailability();

	const createAvailabilityLink = () => navigate(`../${AVAILABILITYWIZARD}`);

	const availableData = availabilityData?.latestAvailability?.dates ?? [];

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
								isAvailabilityEmpty
									? t(
											'components.dashboard.availability-card.first-availability'
										)
									: '',
						}}
						dateLocale={dateLocale}
						today={today}
						availabilityData={availableData}
						handleDayClick={handleDayClick}
					/>
				</Grid>
			</Grid>
			<Modal open={isDateClicked} onClose={() => setIsDateClicked(false)}>
				<StyledPaperModal>
					<Agenda
						availabilityData={availabilityData}
						daySelectedFromCalendar={selectedDay}
						mode='edit'
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
