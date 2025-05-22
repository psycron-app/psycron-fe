import { FormProvider, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { Send } from '@psycron/components/icons';

import { PromptWrapper, SendPromptIconWrapper } from './Prompt.styles';

export const Prompt = () => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<PromptWrapper width={'100%'}>
				<TextField
					multiline
					fullWidth
					placeholder='Please enter your answer here'
					{...methods.register('availability-prompt')}
				/>
				<SendPromptIconWrapper>
					<Send />
				</SendPromptIconWrapper>
			</PromptWrapper>
		</FormProvider>
	);
};
