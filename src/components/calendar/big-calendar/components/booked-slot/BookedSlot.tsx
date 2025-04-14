import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { usePatient } from '@psycron/context/patient/PatientContext';

import { StyledBookedSlotText } from './BookedSlot.styles';
import type { IBookedSlot } from './BookedSlot.types';

export const BookedSlot = ({
	therapistId,
	patientId,
	startTime,
	endTime,
}: IBookedSlot) => {
	const { t } = useTranslation();
	const { patientDetails, isPatientDetailsLoading: isLoading } = usePatient(
		therapistId,
		patientId
	);

	if (isLoading || !patientDetails) return null;

	const patientFirstName = patientDetails.firstName;
	const patientLastName = patientDetails.lastName;

	const patientName = `${patientFirstName} ${patientLastName}`;

	const fromToLabel = t('globals.time-range.time-from-to', {
		start: startTime,
		end: endTime,
	});

	return (
		<Box display='flex' flexDirection='column' textAlign='left'>
			<StyledBookedSlotText variant='caption'>
				{patientName}
			</StyledBookedSlotText>
			<StyledBookedSlotText variant='caption'>
				{`${fromToLabel}`}
			</StyledBookedSlotText>
		</Box>
	);
};
