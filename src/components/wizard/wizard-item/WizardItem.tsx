import { Box } from '@mui/material';

import { WizardItemTitle } from './WizardItem.styles';
import type { IWizardItem } from './WizardItem.types';

export const WizardItem = ({ title, options }: IWizardItem) => {
	return (
		<>
			<WizardItemTitle variant='h4' fontWeight={600}>
				{title}
			</WizardItemTitle>
			<Box py={5}>{options}</Box>
		</>
	);
};
