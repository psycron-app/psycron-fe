import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';

export const AvailabilityIntro = () => {
	const { t } = useTranslation();
	const { register } = useFormContext();

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
