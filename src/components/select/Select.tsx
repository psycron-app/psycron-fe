import { forwardRef } from 'react';
import type { SelectProps } from '@mui/material';
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
			customRenderItem,
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
					onChange={onChangeSelect}
					IconComponent={ChevronDown}
					fullWidth
					inputRef={ref}
				>
					{items?.map((item, index) => (
						<MenuItem
							value={item.value}
							divider={index !== items.length - 1}
							key={`item-${item.value}-${index}`}
						>
							{customRenderItem ? (
								customRenderItem(item)
							) : (
								<>
									{!hidePrimaryValue && (
										<Text variant='caption'>{item.name}</Text>
									)}

									{subtitle && (
										<Text variant='caption' fontSize='0.9rem' pl={2}>
											{item.value}
										</Text>
									)}
								</>
							)}
						</MenuItem>
					))}
				</StyledMUISelect>
			</ControlledWrapper>
		);
	}
);

Select.displayName = 'Select';
