import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { Text } from '@psycron/components/text/Text';

export const AvailabilityDuration = () => {
	const { register } = useFormContext();

	return (
		<Box display='flex' justifyContent='center' flexDirection='column' px={6}>
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
};
