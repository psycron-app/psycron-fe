import type { FieldValues } from 'react-hook-form';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

import { StyledFormControlLabel } from './RadioButton.styles';
import type { IRadioButtonGroup } from './RadioButton.types';

export const RadioButtonGroup = <T extends FieldValues>({
	defaultValue,
	formLabel,
	items,
	row,
	register,
	name,
	...rest
}: IRadioButtonGroup<T>) => {
	return (
		<FormControl>
			{formLabel && <FormLabel>{formLabel}</FormLabel>}
			<RadioGroup defaultValue={defaultValue} row={row} {...rest}>
				{items.map(({ label, value }, index) => (
					<StyledFormControlLabel
						key={`radio-item-${value}-${index}`}
						value={value}
						control={<Radio {...register(name)} />}
						label={label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};
