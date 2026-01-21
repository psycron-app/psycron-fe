import type { Ref } from 'react';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox as MUICheckbox } from '@mui/material';

import { StyledFormControlLabel } from './Checkbox.styles';
import type { ICheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef(
	(props: ICheckboxProps, ref: Ref<HTMLInputElement>) => {
		const { t } = useTranslation();

		const { shouldBold, required } = props;

		const label = 'label' in props ? props.label : t(props.labelKey);

		const isControlled = 'checked' in props;

		return (
			<StyledFormControlLabel
				shouldBold={shouldBold}
				required={required}
				label={label}
				control={
					<MUICheckbox
						slotProps={{ input: { ref } }}
						{...(!isControlled && props.register ? props.register : {})}
						checked={isControlled ? props.checked : undefined}
						onChange={isControlled ? props.onChange : undefined}
					/>
				}
			/>
		);
	}
);

Checkbox.displayName = 'Checkbox';
