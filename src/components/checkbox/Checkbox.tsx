import type { Ref } from 'react';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox as MUICheckbox } from '@mui/material';

import { StyledFormControlLabel } from './Checkbox.styles';
import type { ICheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef(
	(
		{ labelKey, register, checked, onChange, shouldBold }: ICheckboxProps,
		ref: Ref<HTMLInputElement>
	) => {
		const { t } = useTranslation();

		const isControlled = checked !== undefined;

		return (
			<StyledFormControlLabel
				shouldBold={shouldBold}
				control={
					<MUICheckbox
						inputRef={ref}
						{...(register ? register : {})}
						checked={isControlled ? checked : undefined}
						onChange={isControlled ? onChange : undefined}
					/>
				}
				label={t(labelKey)}
			/>
		);
	}
);

Checkbox.displayName = 'Checkbox';
