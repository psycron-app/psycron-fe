import { useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

import { StyledFormControlLabel } from './RadioButton.styles';
import type { IRadioButtonGroup } from './RadioButton.types';

export const RadioButtonGroup = ({
	defaultValue,
	formLabel,
	items,
	row,
	required,
	name,
	...rest
}: IRadioButtonGroup) => {
	const { register } = useFormContext();

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
						required={required}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};
