import { useTranslation } from 'react-i18next';
import { Box, Modal } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import { ShareButton } from '@psycron/components/button/share/ShareButton';
import { Loader } from '@psycron/components/loader/Loader';
import { useDashboardLogic } from '@psycron/hooks/useDashboardLogic';

import { CalendarSection } from './components/calendar-section/CalendarSection';
import { StyledPaperModal } from './Dashboard.styled';

export const Dashboard = () => {
	const { t } = useTranslation();

	const {
		isUserDetailsLoading,
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		userDetails,
		dateLocale,
		today,
		isDateClicked,
		selectedDay,
		setIsDateClicked,
		handleDayClick,
		therapistLatestAvailabilityDates,
	} = useDashboardLogic();

	if (isUserDetailsLoading || therapistLatestAvailabilityLoading) {
		<Loader />;
	}

	return (
		<>
			<Box>
				{userDetails?.availability?.length > 0 && (
					<CalendarSection
						locale={dateLocale}
						today={today}
						dates={therapistLatestAvailabilityDates}
						dayClick={handleDayClick}
						isLoading={therapistLatestAvailabilityLoading}
					/>
				)}
			</Box>
			<Modal open={isDateClicked} onClose={() => setIsDateClicked(false)}>
				<StyledPaperModal>
					<Agenda
						selectedDay={selectedDay}
						availability={therapistLatestAvailability}
						isLoading={therapistLatestAvailabilityLoading}
						isTherapist
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
