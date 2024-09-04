import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';
import { useWizardContext } from '@psycron/context/wizard/WizardContext';
import { DASHBOARD } from '@psycron/pages/urls';

export const AvailabilityIntro = () => {
	const { locale } = useParams<{ locale: string }>();
	const { register, watch } = useForm();

	const { handleNext } = useWizardContext();

	const navigate = useNavigate();

	const introDecision = watch('introDecision');

	useEffect(() => {
		if (introDecision === 'finishLater') {
			navigate(`/${locale}/${DASHBOARD}`);
		}
		if (introDecision === 'proceed') {
			handleNext();
		}
	}, [handleNext, introDecision, locale, navigate]);

	const options = [
		{
			label: 'Sim',
			value: 'proceed',
		},
		{
			label: 'Deixar para depois',
			value: 'finishLater',
		},
	];

	return (
		<Box display='flex' flexDirection='column' alignItems='flex-start'>
			<RadioButtonGroup
				items={options}
				register={register}
				name='introDecision'
			/>
		</Box>
	);
};
