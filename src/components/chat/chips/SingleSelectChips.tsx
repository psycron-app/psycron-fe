import { useState } from 'react';

import { ChipButton, ChipsContainer,ChipsFadeOut } from './ChatChips.styles';
import type { ISingleSelectChipsProps } from './ChatChips.types';

export const SingleSelectChips = ({
	options,
	onSelect,
	disabled = false,
}: ISingleSelectChipsProps) => {
	const [selected, setSelected] = useState<string | null>(null);

	const handleSelect = (key: string) => {
		if (disabled || selected) return;
		setSelected(key);

		setTimeout(() => {
			onSelect(key);
		}, 200);
	};

	if (selected) {
		return <ChipsFadeOut />;
	}

	return (
		<ChipsContainer>
			{options.map((option) => (
				<ChipButton
					key={option.key}
					chipVariant={option.variant}
					onClick={() => handleSelect(option.key)}
					disabled={disabled}
				>
					{option.label}
				</ChipButton>
			))}
		</ChipsContainer>
	);
};
