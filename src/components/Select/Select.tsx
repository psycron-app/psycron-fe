import { forwardRef } from 'react';
import type { SelectChangeEvent, SelectProps } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Text } from '@psycron/components/text/Text';
import { ChevronDown } from 'lucide-react';

import {
	ControlledWrapper,
	StyledInputLabel,
	StyledMUISelect,
} from './Select.styles';
import type { SelectComponentProps } from './Select.types';

export const Select = forwardRef<
	HTMLSelectElement,
	SelectComponentProps & SelectProps
>(
	(
		{
			items,
			onChangeSelect,
			selectLabel,
			value,
			required,
			disabled,
			subtitle,
			width,
			name,
			hidePrimaryValue,
		},
		ref
	) => {
		const labelId = `${name}-label`;

		return (
			<ControlledWrapper
				required={required}
				fullWidth={!width && true}
				disabled={disabled}
				width={width}
			>
				<StyledInputLabel id={labelId}>{selectLabel}</StyledInputLabel>
				<StyledMUISelect
					variant='standard'
					name={name}
					value={value}
					labelId={labelId}
					label={selectLabel}
					aria-labelledby={labelId}
					aria-label={selectLabel}
					onChange={
						onChangeSelect as (
							event: SelectChangeEvent<string | number>
						) => void
					}
					IconComponent={ChevronDown}
					fullWidth
					inputRef={ref}
				>
					{items?.map(({ name, value }, index) => (
						<MenuItem
							value={value}
							divider={index !== items.length - 1}
							key={`item-${name}-${value}`}
						>
							{!hidePrimaryValue ? <Text variant='caption'>{name}</Text> : null}

							{subtitle ? (
								<Text variant='caption' fontSize={'0.9rem'} pl={2}>
									{value}
								</Text>
							) : null}
						</MenuItem>
					))}
				</StyledMUISelect>
			</ControlledWrapper>
		);
	}
);

Select.displayName = 'Select';
