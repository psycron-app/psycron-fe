import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { RadioButtonGroup } from '@psycron/components/radio/RadioButton';

import type {
	IAvailabilityDaysForm,
	IWeekDays,
} from '../../AvailabilityWizard.types';

export const AvailabilityDays = () => {
	const { t } = useTranslation();
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
		{
			label: t('page.availability.wizard.availability-days.days.mon'),
			registerLabel: 'monday',
		},
		{
			label: t('page.availability.wizard.availability-days.days.tue'),
			registerLabel: 'tuesday',
		},
		{
			label: t('page.availability.wizard.availability-days.days.wed'),
			registerLabel: 'wednesday',
		},
		{
			label: t('page.availability.wizard.availability-days.days.thu'),
			registerLabel: 'thursday',
		},
		{
			label: t('page.availability.wizard.availability-days.days.fri'),
			registerLabel: 'friday',
		},
	];

	const options: { label: string; value: keyof IAvailabilityDaysForm }[] = [
		{
			label: t('page.availability.wizard.availability-days.options.all'),
			value: 'everyday',
		},
		{
			label: t('page.availability.wizard.availability-days.options.weekends'),
			value: 'noWeekends',
		},
		{
			label: t('page.availability.wizard.availability-days.options.specific'),
			value: 'specificDays',
		},
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
