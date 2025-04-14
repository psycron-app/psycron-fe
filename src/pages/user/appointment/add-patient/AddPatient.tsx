import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { ContactsForm } from '@psycron/components/form/components/contacts/ContactsForm';
import { NameForm } from '@psycron/components/form/components/name/NameForm';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { getFormattedContacts } from '@psycron/hooks/useFormattedContacts';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';
import { APPOINTMENTS } from '@psycron/pages/urls';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { ICreatePatientForm } from './AddPatient.types';

export const AddPatient = () => {
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const availabilityDayId = searchParams.get('availabilityDayId');
	const slotId = searchParams.get('slotId');

	const { therapistId } = useUserDetails();
	const { createPatientMttn } = usePatient();

	const methods = useForm<ICreatePatientForm>();

	const { handleSubmit } = methods;

	const onSubmit = (formData: ICreatePatientForm) => {
		const { email, firstName, lastName } = formData;

		const { fullPhone, fullWhatsapp } = getFormattedContacts(formData);

		const patientData = {
			therapistId,
			availabilityDayId,
			slotId,
			patient: {
				firstName: firstName,
				lastName: lastName,
				contacts: {
					email: email,
					phone: fullPhone,
					...(fullWhatsapp ? { whatsapp: fullWhatsapp } : {}),
				},
			},
		};

		createPatientMttn(patientData);
	};

	return (
		<PageLayout
			title={t('page.add-patient.title')}
			subTitle={t('page.add-patient.sub-title')}
			backButton
			backTo={APPOINTMENTS}
			isLoading={false}
		>
			<FormProvider {...methods}>
				<Box
					height='100%'
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					component='form'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid size={12}>
						<NameForm required />
						<ContactsForm required />
					</Grid>
					<Box display='flex' py={spacing.small} justifyContent='flex-end'>
						<Button type='submit'>Save Patient</Button>
					</Box>
				</Box>
			</FormProvider>
		</PageLayout>
	);
};
