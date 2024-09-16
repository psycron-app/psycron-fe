import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';

import type {
	IAvailabilityDaysForm,
	IWeekDays,
} from '../../AvailabilityWizard.types';

export const AvailabilityDays = () => {
	const { register, watch } = useFormContext();

	const [showDays, setShowDays] = useState<boolean>(false);
	const availabilityDaysValue = watch('availabilityDays');

	useEffect(() => {
		setShowDays(availabilityDaysValue === 'specificDays');
	}, [availabilityDaysValue]);

	const daysOfWeek: {
		label: string;
		registerLabel: keyof IWeekDays;
	}[] = [
		{ label: 'Segunda-feira', registerLabel: 'monday' },
		{ label: 'Terça-feira', registerLabel: 'tuesday' },
		{ label: 'Quarta-feira', registerLabel: 'wednesday' },
		{ label: 'Quinta-feira', registerLabel: 'thursday' },
		{ label: 'Sexta-feira', registerLabel: 'friday' },
	];

	const options: { label: string; value: keyof IAvailabilityDaysForm }[] = [
		{ label: 'Incluir Todos os dias', value: 'everyday' },
		{ label: 'Excluir fins de semana', value: 'noWeekends' },
		{ label: 'Incluir apenas dias específicos', value: 'specificDays' },
	];

	return (
		<Box display='flex' flexDirection='column' alignItems='flex-start' pl={6}>
			<RadioButtonGroup
				items={options}
				register={register}
				name='availabilityDays'
				required
			/>
			<Box>
				{showDays && (
					<Box
						display='flex'
						flexDirection='column'
						alignItems='flex-start'
						pl={10}
						pt={2}
						position='absolute'
					>
						{daysOfWeek.map(({ label, registerLabel }, index) => (
							<Box key={index}>
								<Checkbox labelKey={label} register={register(registerLabel)} />
							</Box>
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
};
