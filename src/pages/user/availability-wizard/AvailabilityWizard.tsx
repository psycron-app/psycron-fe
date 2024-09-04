import { useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { AnimatedBackground } from '@psycron/components/animated-background/AnimatedBackground';
import { Text } from '@psycron/components/text/Text';
import { Wizard } from '@psycron/components/wizard/Wizard';
import { WizardItem } from '@psycron/components/wizard/wizard-item/WizardItem';

import { AvailabilityDays } from './components/AvailabilityDays';
import { AvailabilityHours } from './components/AvailabilityHours';
import { AvailabilityIntro } from './components/AvailabilityIntro';

export const AvailabilityWizard = () => {
	const { register } = useForm();

	const option3 = (
		<Box display='flex' justifyContent='center' flexDirection='column'>
			<Box
				width={'100%'}
				display='flex'
				justifyContent='center'
				alignItems='center'
			>
				<TextField
					label='Duração da consulta'
					type='number'
					{...register('duration')}
				/>
				<Text pl={3}>min</Text>
			</Box>
			<Text variant='caption' pt={5}>
				Caso você tenha mais de um tipo de consulta, nos informe a duração que
				você mais utiliza. Você poderá alterar isso no futuro, sem maiores
				problemas!
			</Text>
		</Box>
	);

	const steps = [
		{
			label: 'Introdução',
			content: (
				<WizardItem
					title='Vamos configurar sua disponibilidade. Pronto para começar?'
					options={<AvailabilityIntro />}
				/>
			),
		},
		{
			label: 'Selecione os dias da semana',
			content: (
				<WizardItem
					title='Por favor nos informe os dias no qual você costuma atender os seus pacientes'
					options={<AvailabilityDays />}
				/>
			),
		},
		{
			label: 'Duração da consulta',
			content: (
				<WizardItem
					title='Por favor nos informe quanto tempo dura a sua consulta'
					options={option3}
				/>
			),
		},
		{
			label: 'Horários indisponíveis',
			content: (
				<Box width={'100%'} position='relative' top={'26.875rem'}>
					<AvailabilityHours />
				</Box>
			),
		},
	];

	const handleComplete = () => {
		console.log('Wizard finalizado!');
	};

	return (
		<>
			<AnimatedBackground />
			<Wizard steps={steps} onComplete={handleComplete} />
		</>
	);
};
