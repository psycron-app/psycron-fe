import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import { Text } from '@psycron/components/text/Text';
import { useDashboardLogic } from '@psycron/hooks/useDashboardLogic';

export const EditAppointment = () => {
	const { therapistLatestAvailability, therapistLatestAvailabilityLoading } =
		useDashboardLogic();

	const [searchParams] = useSearchParams();
	const selectedDate = searchParams.get('date');

	return (
		<Box>
			<Box>
				<Text>Edit Appointment Page</Text>
			</Box>
			<Agenda
				isLoading={therapistLatestAvailabilityLoading}
				selectedDay={new Date(selectedDate)}
				availability={therapistLatestAvailability}
				isBig
				isTherapist
				isEditingMode
			/>
		</Box>
	);
};
