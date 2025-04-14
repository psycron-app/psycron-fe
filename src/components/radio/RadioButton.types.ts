import type { RadioGroupProps } from '@mui/material';

export interface IRadioButtonGroup extends RadioGroupProps {
	defaultValue?: string;
	formLabel?: string;
	items: { label: string; value: string }[];
	name: string;
	required?: boolean;
	row?: boolean;
}
