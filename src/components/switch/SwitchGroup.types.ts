import type { ReactNode } from 'react';
import type { FormControlLabelProps, SwitchProps } from '@mui/material';

export interface ISwitchGroupProps {
	items: Partial<FormControlLabelProps>[];
	small?: boolean;
}

export interface ISwitchProps extends SwitchProps {
	label?: string | ReactNode;
	small?: boolean;
}
