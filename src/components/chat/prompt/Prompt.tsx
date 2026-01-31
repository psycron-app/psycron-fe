import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IconButton, TextField } from '@mui/material';
import { Send } from '@psycron/components/icons';

import { PromptWrapper, SendPromptIconWrapper } from './Prompt.styles';
import type { IPromptProps } from './Prompt.types';

const PROMPT_REGISTER = 'availability-prompt';

export const Prompt = ({ onSubmit }: IPromptProps) => {
	const methods = useForm();
	const { handleSubmit, watch, reset } = methods;

	const promptValue = watch(PROMPT_REGISTER);

	const isFilled = !!promptValue?.trim();

	const onSubmitForm = () => {
		const text = promptValue?.trim();
		if (text) {
			onSubmit(text);
			reset();
		}
	};

	const onKeyDownInput = (e: ReactKeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onSubmitForm();
		}
	};

	return (
		<FormProvider {...methods}>
			<PromptWrapper as='form' onSubmit={handleSubmit(onSubmitForm)}>
				<TextField
					multiline
					fullWidth
					placeholder='Please enter your answer here'
					onKeyDown={(e) => onKeyDownInput(e)}
					{...methods.register(PROMPT_REGISTER)}
				/>
				<SendPromptIconWrapper disabled={!isFilled}>
					<IconButton disabled={!isFilled} type='submit'>
						<Send />
					</IconButton>
				</SendPromptIconWrapper>
			</PromptWrapper>
		</FormProvider>
	);
};
