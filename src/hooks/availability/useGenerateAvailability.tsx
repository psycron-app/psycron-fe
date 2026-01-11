import { generateAvailabilityFromPrompt } from '@psycron/api/openai';
import { useMutation } from '@tanstack/react-query';

export const useGenerateAvailability = () => {
	const generateMttn = useMutation({
		mutationKey: ['generate-availability'],
		mutationFn: generateAvailabilityFromPrompt,
	});

	return {
		openAIGenerateAvailability: generateMttn.mutate,
	};
};
