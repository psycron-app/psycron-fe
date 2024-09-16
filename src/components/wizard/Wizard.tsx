import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import type { CustomError } from '@psycron/api/error';
import {
	completeSessionAvailability,
	initiateAvailabilitySession,
	updateAvailabilitySession,
} from '@psycron/api/user/availability';
import type { ICompleteSessionAvailabilityData } from '@psycron/api/user/availability/index.types';
import { Text } from '@psycron/components/text/Text';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useWizardContext } from '@psycron/context/wizard/WizardContext';
import useViewport from '@psycron/hooks/useViewport';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

import { Button } from '../button/Button';
import { Modal } from '../modal/Modal';
import { RadioButtonGroup } from '../radio/RadioButton';

import {
	AnimationWrapper,
	WizardActionWrapper,
	WizardContentWrapper,
	WizardMotion,
	WizardStepper,
	WizardWrapper,
} from './Wizard.styles';
import type { IWizardProps, StepData } from './Wizard.types';

export const Wizard = ({ steps, onComplete }: IWizardProps) => {
	const { t } = useTranslation();
	const { handleSubmit, getValues, register } = useFormContext();

	const { showAlert } = useAlert();

	const { isBiggerThanMedium } = useViewport();

	const { userDetails } = useUserDetails();

	const { activeStep, handleNext, handleBack, direction } = useWizardContext();

	const [sessionId, setSessionId] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const initiateAvailabilitySessionMutation = useMutation({
		mutationFn: initiateAvailabilitySession,
		onSuccess: (data) => {
			setSessionId(data.sessionId);
		},
		onError: (error: CustomError) => {
			showAlert({
				message: error.message,
				severity: 'error',
			});
		},
	});

	const updateAvailabilitySessionMutation = useMutation({
		mutationFn: updateAvailabilitySession,
		onError: (error: CustomError) => {
			showAlert({
				message: error.message,
				severity: 'error',
			});
		},
	});

	const completeAvailabilitySessionMutation = useMutation({
		mutationFn: (data: ICompleteSessionAvailabilityData) =>
			completeSessionAvailability(data.sessionId, data),
		onSuccess: () => {
			showAlert({
				message: 'Sessão de disponibilidade concluída!',
				severity: 'success',
			});
		},
		onError: (error) => {
			showAlert({
				message: error.message,
				severity: 'error',
			});
		},
	});

	const handleStepSubmit = async (stepData: StepData, step: number) => {
		if (sessionId) {
			await updateAvailabilitySessionMutation.mutateAsync({
				sessionId,
				data: { ...stepData, step },
			});
		}
	};

	const isLastStep = activeStep === steps.length - 1;

	const onSubmit = async () => {
		const stepData = getValues();

		if (activeStep === 0) {
			await initiateAvailabilitySessionMutation.mutateAsync({
				therapistId: userDetails?._id,
			});
			handleNext();
		} else if (!isLastStep) {
			await handleStepSubmit(stepData, activeStep);
			handleNext();
		} else if (isLastStep) {
			setIsModalOpen(true);
		}
	};

	const handleFinish = () => {
		onComplete();
		handleNext();
	};

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

	const handleRecurrenceSelection = async () => {
		const { selectedSlots, recurrencePattern } = getValues();

		await completeAvailabilitySessionMutation.mutateAsync({
			sessionId,
			selectedSlots: selectedSlots,
			recurrencePattern: recurrencePattern,
		});

		setIsModalOpen(false);
		handleFinish();
	};

	const recurrenceSelection = [
		{ label: 'Weekly', value: 'WEEKLY' },
		{ label: 'Monthly', value: 'MONTHLY' },
	];

	return (
		<>
			<WizardWrapper>
				<Box display='flex'>
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
				</Box>
				<WizardContentWrapper as='form' onSubmit={handleSubmit(onSubmit)}>
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
							>
								{steps[activeStep]?.content()}
							</WizardMotion>
						</AnimatePresence>
					</AnimationWrapper>
					<WizardActionWrapper>
						<Button disabled={activeStep === 0} onClick={handleBack}>
							{t('components.link.navigate.back')}
						</Button>
						<Button
							onClick={
								activeStep === steps.length - 1 ? handleFinish : handleNext
							}
							// type='submit'
						>
							{activeStep === steps.length - 1
								? t('components.link.navigate.finish')
								: t('components.link.navigate.next')}
						</Button>
					</WizardActionWrapper>
				</WizardContentWrapper>
			</WizardWrapper>
			<Modal
				openModal={isModalOpen}
				title={t('page.availability.wizard.modal-title')}
				cardActionsProps={{
					actionName: t('components.link.navigate.next'),
					secondActionName: t('components.link.navigate.back'),
					hasSecondAction: true,
					onClick: handleSubmit(handleRecurrenceSelection),
					secondAction: () => setIsModalOpen(false),
				}}
			>
				<Text>{t('page.availability.wizard.modal-info')}</Text>
				<Box>
					<RadioButtonGroup
						items={recurrenceSelection}
						register={register}
						name='recurrencePattern'
						required
					/>
				</Box>
			</Modal>
		</>
	);
};
