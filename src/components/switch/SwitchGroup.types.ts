import type { ReactNode } from 'react';
import type { FormControlLabelProps } from '@mui/material';
import type { SwitchProps as MUISwitchProps } from '@mui/material/Switch';

export interface ISwitchGroupProps {
	items: Partial<FormControlLabelProps>[];
	small?: boolean;
}

export interface ISwitchProps {
	checked: boolean;
	disabled?: boolean;
	label?: ReactNode;
	onChange?: MUISwitchProps['onChange'];
	required?: boolean;
	small?: boolean;
}
