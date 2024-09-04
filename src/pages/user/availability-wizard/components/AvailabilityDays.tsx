import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';

export const AvailabilityDays = () => {
	const { register, watch } = useForm();

	const [showDays, setShowDays] = useState<boolean>(false);
	// const [showCountries, setShowCountries] = useState<boolean>(false);

	const specificDaysChecked = watch('specificDays');

	useEffect(() => {
		setShowDays(specificDaysChecked);
	}, [specificDaysChecked]);

	const daysOfWeek = [
		{ label: 'Segunda-feira', registerLabel: 'monday' },
		{ label: 'Terça-feira', registerLabel: 'tuesday' },
		{ label: 'Quarta-feira', registerLabel: 'wednesday' },
		{ label: 'Quinta-feira', registerLabel: 'thursday' },
		{ label: 'Sexta-feira', registerLabel: 'friday' },
	];

	const options = [
		{
			label: 'Incluir Todos os dias',
			registerLabel: 'everyday',
		},
		{
			label: 'Excluir fins de semana',
			registerLabel: 'noWeekends',
		},
		{
			label: 'Excluir dias específicos',
			registerLabel: 'specificDays',
		},
	];

	return (
		<Box display='flex' flexDirection='column' alignItems='flex-start'>
			{options.map(({ label, registerLabel }, index) => (
				<Box key={index}>
					<Checkbox labelKey={label} register={register(registerLabel)} />
				</Box>
			))}
			{showDays && (
				<Box
					display='flex'
					flexDirection='column'
					alignItems='flex-start'
					pl={10}
					pt={2}
				>
					{daysOfWeek.map(({ label, registerLabel }, index) => (
						<Box key={index}>
							<Checkbox labelKey={label} register={register(registerLabel)} />
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
};
