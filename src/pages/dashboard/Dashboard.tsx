import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Modal } from '@mui/material';
import { AgendaNew } from '@psycron/components/agenda/AgendaNew';
import { ShareButton } from '@psycron/components/button/share/ShareButton';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { useDashboardLogic } from '@psycron/hooks/useDashboardLogic';

import { AVAILABILITYWIZARD } from '../urls';

import { StyledPaperModal } from './Dashboard.styled';

export const Dashboard = () => {
	const { t } = useTranslation();

	const navigate = useNavigate();
	const {
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		userDetails,
		dateLocale,
		today,
		isDateClicked,
		selectedDay,
		setIsDateClicked,
		handleDayClick,
		emptyAvailability,
	} = useDashboardLogic();

	const createAvailabilityLink = () => navigate(`../${AVAILABILITYWIZARD}`);

	const availableDatesArray =
		therapistLatestAvailability?.latestAvailability?.dates ?? [];

	return (
		<>
			<Grid container style={{ height: '100%' }}>
				<Grid size={10}>
					<Calendar
						isLoading={therapistLatestAvailabilityLoading}
						skeletonProps={{
							onClick: createAvailabilityLink,
							text:
								!therapistLatestAvailabilityLoading &&
								therapistLatestAvailability &&
								emptyAvailability
									? t(
											'components.dashboard.availability-card.first-availability'
										)
									: '',
						}}
						dateLocale={dateLocale}
						today={today}
						availabilityDates={availableDatesArray}
						handleDayClick={handleDayClick}
					/>
				</Grid>
			</Grid>
			<Modal open={isDateClicked} onClose={() => setIsDateClicked(false)}>
				<StyledPaperModal>
					{/* <Agenda
						selectedDay={selectedDay}
						availability={therapistLatestAvailability}
						isLoading={therapistLatestAvailabilityLoading}
						isTherapist
					/> */}
					<AgendaNew
						availability={therapistLatestAvailability}
						daySelectedFromCalendar={selectedDay}
						mode={'view'}
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
