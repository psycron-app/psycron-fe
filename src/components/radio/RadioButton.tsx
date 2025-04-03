import { Controller, useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';

import { StyledFormControlLabel } from './RadioButton.styles';
import type { IRadioButtonGroup } from './RadioButton.types';

export const RadioButtonGroup = ({
	formLabel,
	items,
	row,
	required,
	name,
	...rest
}: IRadioButtonGroup) => {
	const { control } = useFormContext();

	return (
		<FormControl component='fieldset' required={required}>
			{formLabel && <FormLabel component='legend'>{formLabel}</FormLabel>}
			<Controller
				name={name}
				control={control}
				defaultValue={undefined}
				rules={{ required }}
				render={({ field, fieldState }) => (
					<RadioGroup {...field} row={row} value={field.value ?? ''} {...rest}>
						{items.map(({ label, value }, index) => (
							<StyledFormControlLabel
								key={`radio-item-${value}-${index}`}
								value={value}
								control={<Radio />}
								label={label}
								required={required}
							/>
						))}
						{fieldState.invalid && (
							<FormHelperText error>{'is required'}</FormHelperText>
						)}
					</RadioGroup>
				)}
			/>
		</FormControl>
	);
};
