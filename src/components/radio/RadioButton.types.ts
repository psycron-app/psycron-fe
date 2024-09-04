import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import type { RadioGroupProps } from '@mui/material';

export interface IRadioButtonGroup<T extends FieldValues>
	extends RadioGroupProps {
	defaultValue?: string;
	formLabel?: string;
	items: { label: string; value: string }[];
	name: Path<T>;
	register: UseFormRegister<T>;
	row?: boolean;
}
