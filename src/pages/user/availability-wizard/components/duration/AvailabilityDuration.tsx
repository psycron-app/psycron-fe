import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, TextField } from '@mui/material';
import { Text } from '@psycron/components/text/Text';

export const AvailabilityDuration = () => {
	const { t } = useTranslation();
	const { register } = useFormContext();

	return (
		<Box
			display='flex'
			justifyContent='center'
			flexDirection='column'
			alignItems='center'
			px={6}
		>
			<Box
				width={'100%'}
				display='flex'
				justifyContent='center'
				alignItems='center'
			>
				<TextField
					label={t('page.availability.wizard.duration.label')}
					type='number'
					{...register('duration')}
				/>
				<Text pl={3}>min</Text>
			</Box>
			<Text fontSize='0.9rem' pt={5}>
				{t('page.availability.wizard.duration.note')}
			</Text>
		</Box>
	);
};
