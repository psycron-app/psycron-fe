import { Box, Stepper } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { useWizardContext } from '@psycron/context/wizard/WizardContext';
import useViewport from '@psycron/hooks/useViewport';
import { AnimatePresence } from 'framer-motion';

import { Button } from '../button/Button';

import {
	AnimationWrapper,
	WizardActionWrapper,
	WizardContentWrapper,
	WizardMotion,
	WizardStepper,
	WizardWrapper,
} from './Wizard.styles';
import type { IWizardProps } from './Wizard.types';

export const Wizard = ({ steps, onComplete }: IWizardProps) => {
	const { isBiggerThanMedium } = useViewport();

	const { activeStep, handleNext, handleBack, direction } = useWizardContext();

	const handleFinish = () => {
		onComplete();
		handleNext();
	};

	const isLastStep = activeStep === steps.length - 1;

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
			transition: {
				duration: 0.01,
			},
		}),
		center: {
			x: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				duration: 1,
			},
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
			transition: {
				duration: 0.01,
			},
		}),
	};

	const getProgressValue = (index: number) => {
		if (index < activeStep) return 100;
		if (index === activeStep) return 50;
		return 0;
	};

	return (
		<WizardWrapper>
			<Stepper activeStep={activeStep}>
				{steps.map((step, index) => (
					<Box
						key={index}
						display='flex'
						flexDirection='column'
						alignItems='center'
						width='100%'
						mr={1}
					>
						<WizardStepper
							variant='determinate'
							value={getProgressValue(index)}
						/>
						{isBiggerThanMedium ? (
							<Text variant='subtitle2' pt={4}>
								{step.label}
							</Text>
						) : null}
					</Box>
				))}
			</Stepper>
			<WizardContentWrapper>
				<AnimationWrapper>
					<AnimatePresence custom={direction}>
						<WizardMotion
							key={activeStep}
							variants={variants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{ type: 'tween', duration: 0.5 }}
							custom={direction}
							isLastStep={isLastStep}
						>
							{steps[activeStep].content}
						</WizardMotion>
					</AnimatePresence>
				</AnimationWrapper>
				<WizardActionWrapper>
					<Button disabled={activeStep === 0} onClick={handleBack}>
						Voltar
					</Button>
					<Button
						onClick={
							activeStep === steps.length - 1 ? handleFinish : handleNext
						}
					>
						{activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
					</Button>
				</WizardActionWrapper>
			</WizardContentWrapper>
			{activeStep === steps.length && (
				<Box>
					<Text>Todas as etapas foram concluídas!</Text>
				</Box>
			)}
		</WizardWrapper>
	);
};
