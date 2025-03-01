import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import { useDashboardLogic } from '@psycron/hooks/useDashboardLogic';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';

export const EditAppointment = () => {
	const { t } = useTranslation();

	const { therapistLatestAvailability, therapistLatestAvailabilityLoading } =
		useDashboardLogic();

	const [searchParams] = useSearchParams();
	const selectedDate = searchParams.get('date');

	return (
		<PageLayout
			title={t('page.edit-appointment.title')}
			subTitle={t('page.edit-appointment.sub-title')}
			isLoading={therapistLatestAvailabilityLoading}
		>
			<Box>
				<Box></Box>
				<Agenda
					isLoading={therapistLatestAvailabilityLoading}
					selectedDay={new Date(selectedDate)}
					availability={therapistLatestAvailability}
					isBig
					isTherapist
					isEditingMode
				/>
			</Box>
		</PageLayout>
	);
};
