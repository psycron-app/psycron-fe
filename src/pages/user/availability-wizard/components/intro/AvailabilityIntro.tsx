import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';
import { useAlert } from '@psycron/context/alert/AlertContext';
import i18n from '@psycron/i18n';
import { DASHBOARD } from '@psycron/pages/urls';

export const AvailabilityIntro = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { showAlert } = useAlert();

	const { register, getValues } = useFormContext();

	const introDecision = getValues('introDecision');

	useEffect(() => {
		if (introDecision === 'finishLater') {
			navigate(`/${i18n.language}/${DASHBOARD}`);
			showAlert({
				severity: 'info',
				message: t('page.availability.wizard.wizard-items.intro.alert'),
			});
		}
	}, [introDecision, navigate, showAlert, t]);

	const options = [
		{
			label: t('page.availability.wizard.intro.options.proceed'),
			value: 'proceed',
		},
		{
			label: t('page.availability.wizard.intro.options.finish-later'),
			value: 'finishLater',
		},
	];

	return (
		<Box display='flex' flexDirection='column' pl={6}>
			<RadioButtonGroup
				items={options}
				register={register}
				name='introDecision'
				required
			/>
		</Box>
	);
};
