import { useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';

export const AvailabilityIntro = () => {
	const { register } = useFormContext();

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
		<Box display='flex' flexDirection='column' pl={6}>
			<RadioButtonGroup
				items={options}
				register={register}
				name='introDecision'
			/>
		</Box>
	);
};
