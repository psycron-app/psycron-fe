import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ContactsForm } from '@psycron/components/form/components/contacts/ContactsForm';
import { NameForm } from '@psycron/components/form/components/name/NameForm';
import { formatPhoneNumber } from '@psycron/components/form/components/phone/utils';
import { Loader } from '@psycron/components/loader/Loader';
import { Modal } from '@psycron/components/modal/Modal';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';
import { Text } from '@psycron/components/text/Text';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { generateUserTimeZone } from '@psycron/utils/variables';

import type { IConfirmationModal } from './ConfirmationModal.types';

export const ConfirmationModal = ({
	handleCancelConfirmation,
	openConfirmationModal,
	selectedSlot,
	therapistId,
	availabilityId,
}: IConfirmationModal) => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const { t } = useTranslation();

	const { showAlert } = useAlert();

	const {
		register,
		getValues,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { bookAppointmentWithLink, bookAppointmentFromLinkMttnIsLoading } =
		usePatient();
	const patientTimeZone = generateUserTimeZone();

	const handleConfirmBook = () => {
		const {
			firstName,
			lastName,
			email,
			phone,
			whatsapp,
			countryCode,
			shouldReplicate,
		} = getValues();

		if (!firstName?.length || !lastName?.length || !email?.length) {
			return showAlert({
				message: t('components.form.not-valid'),
				severity: 'error',
			});
		}

		const phoneNumber = formatPhoneNumber(countryCode, phone);

		const whatsappNumber = whatsapp
			? formatPhoneNumber(countryCode, whatsapp)
			: phoneNumber;

		const appointmentData = {
			therapistId,
			data: {
				availabilityId,
				selectedSlot,
				timeZone: patientTimeZone,
				shouldReplicate,
				patient: {
					contacts: { email, phone: phoneNumber, whatsapp: whatsappNumber },
					firstName,
					lastName,
				},
			},
		};

		bookAppointmentWithLink(appointmentData);
	};

	const handleManualSubmit = () => {
		if (formRef.current) {
			formRef.current.dispatchEvent(
				new Event('submit', { cancelable: true, bubbles: true })
			);
		}
	};

	const recurrenceSelection = [
		{ label: 'Yes', value: 'true' },
		{ label: 'No', value: 'false' },
	];

	if (bookAppointmentFromLinkMttnIsLoading) {
		return <Loader />;
	}

	return (
		<Modal
			title={t('components.agenda.your-details')}
			openModal={openConfirmationModal}
			cardActionsProps={{
				actionName: t('components.link.navigate.confirm'),
				onClick: handleManualSubmit,
				hasSecondAction: true,
				secondActionName: t('components.link.navigate.cancel'),
				secondAction: handleCancelConfirmation,
				type: 'submit',
			}}
		>
			<form ref={formRef} onSubmit={handleSubmit(handleConfirmBook)}>
				<Box>
					<NameForm register={register} errors={errors} />
					<Box pt={6}>
						<ContactsForm
							register={register}
							errors={errors}
							getPhoneValue={getValues}
							setPhoneValue={setValue}
							setValue={setValue}
						/>
						<Text>
							{t('page.book-appointment.confirmation-should-replicate')}
						</Text>
						<RadioButtonGroup
							register={register}
							items={recurrenceSelection}
							name='shouldReplicate'
						/>
					</Box>
				</Box>
			</form>
		</Modal>
	);
};
