import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '@psycron/components/animated-background/AnimatedBackground';
import { Wizard } from '@psycron/components/wizard/Wizard';
import { WizardItem } from '@psycron/components/wizard/wizard-item/WizardItem';
import i18n from '@psycron/i18n';
import { DASHBOARD } from '@psycron/pages/urls';
import { useQueryClient } from '@tanstack/react-query';

import { AvailabilityDays } from './components/days/AvailabilityDays';
import { AvailabilityDuration } from './components/duration/AvailabilityDuration';
import { AvailabilityHours } from './components/hours/AvailabilityHours';
import { AvailabilityIntro } from './components/intro/AvailabilityIntro';
import {
	StyledAvailabilityHoursWrapper,
	StyledItemContentWrapper,
} from './AvailabilityWizard.styles';

export const AvailabilityWizard = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const methods = useForm();

	const steps = [
		{
			label: t('page.availability.wizard.wizard-items.intro.label'),
			content: () => {
				return (
					<StyledItemContentWrapper>
						<WizardItem
							title={t('page.availability.wizard.wizard-items.intro.title')}
							options={<AvailabilityIntro />}
						/>
					</StyledItemContentWrapper>
				);
			},
		},
		{
			label: t('page.availability.wizard.wizard-items.weekdays.label'),
			content: () => (
				<StyledItemContentWrapper>
					<WizardItem
						title={t('page.availability.wizard.wizard-items.weekdays.title')}
						options={<AvailabilityDays />}
					/>
				</StyledItemContentWrapper>
			),
		},
		{
			label: t('page.availability.wizard.wizard-items.duration.label'),
			content: () => (
				<StyledItemContentWrapper>
					<WizardItem
						title={t('page.availability.wizard.wizard-items.duration.title')}
						options={<AvailabilityDuration />}
					/>
				</StyledItemContentWrapper>
			),
		},
		{
			label: t('page.availability.wizard.wizard-items.week-slots.label'),
			content: () => (
				<StyledAvailabilityHoursWrapper>
					<AvailabilityHours />
				</StyledAvailabilityHoursWrapper>
			),
		},
	];

	const handleComplete = async () => {
		await queryClient.invalidateQueries({
			queryKey: ['therapistAvailability'],
		});
		navigate(`/${i18n.language}/${DASHBOARD}`);
	};

	return (
		<FormProvider {...methods}>
			<Wizard steps={steps} onComplete={handleComplete} />
			<AnimatedBackground />
		</FormProvider>
	);
};
