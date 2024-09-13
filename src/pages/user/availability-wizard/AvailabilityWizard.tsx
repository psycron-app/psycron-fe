import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatedBackground } from '@psycron/components/animated-background/AnimatedBackground';
import { Wizard } from '@psycron/components/wizard/Wizard';
import { WizardItem } from '@psycron/components/wizard/wizard-item/WizardItem';
import i18n from '@psycron/i18n';
import { DASHBOARD } from '@psycron/pages/urls';

import { AvailabilityDays } from './components/days/AvailabilityDays';
import { AvailabilityDuration } from './components/duration/AvailabilityDuration';
import { AvailabilityHours } from './components/hours/AvailabilityHours';
import { AvailabilityIntro } from './components/intro/AvailabilityIntro';
import { StyledItemContentWrapper } from './AvailabilityWizard.styles';

export const AvailabilityWizard = () => {
	const navigate = useNavigate();

	const methods = useForm();

	const steps = [
		{
			label: 'Introdução',
			content: () => {
				return (
					<StyledItemContentWrapper>
						<WizardItem
							title='Vamos configurar sua disponibilidade. Pronto para começar?'
							options={<AvailabilityIntro />}
						/>
					</StyledItemContentWrapper>
				);
			},
		},
		{
			label: 'Selecione os dias da semana',
			content: () => (
				<StyledItemContentWrapper>
					<WizardItem
						title='Por favor nos informe os dias no qual você costuma atender os seus pacientes'
						options={<AvailabilityDays />}
					/>
				</StyledItemContentWrapper>
			),
		},
		{
			label: 'Duração da consulta',
			content: () => (
				<StyledItemContentWrapper>
					<WizardItem
						title='Por favor nos informe quanto tempo dura a sua consulta'
						options={<AvailabilityDuration />}
					/>
				</StyledItemContentWrapper>
			),
		},
		{
			label: 'Horários em uma semana',
			content: () => (
				<Box
					display='flex'
					flexDirection='column'
					width='100%'
					height='100%'
					position='relative'
				>
					<AvailabilityHours />
				</Box>
			),
		},
	];

	const handleComplete = () => {
		navigate(`/${i18n.language}/${DASHBOARD}`);
	};

	return (
		<FormProvider {...methods}>
			<Wizard steps={steps} onComplete={handleComplete} />
			<AnimatedBackground />
		</FormProvider>
	);
};
