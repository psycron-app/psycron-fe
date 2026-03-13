import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useCallback, useState } from 'react';

import {
	ChipButton,
	ChipsContainer,
	ChipsFadeOut,
	ContinueButton,
	OtherInput,
} from './ChatChips.styles';
import type { IMultiSelectChipsProps } from './ChatChips.types';

export const MultiSelectChips = ({
	options,
	onConfirm,
	confirmLabel,
	disabled = false,
	otherPlaceholder,
	onOtherSubmit,
}: IMultiSelectChipsProps) => {
	const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
	const [submitted, setSubmitted] = useState(false);
	const [showOther, setShowOther] = useState(false);
	const [otherValue, setOtherValue] = useState('');

	const toggleKey = useCallback(
		(key: string) => {
			if (disabled || submitted) return;
			setSelectedKeys((prev) => {
				const next = new Set(prev);
				if (next.has(key)) {
					next.delete(key);
				} else {
					next.add(key);
				}
				return next;
			});
		},
		[disabled, submitted]
	);

	const handleConfirm = () => {
		if (selectedKeys.size === 0 || submitted) return;
		setSubmitted(true);

		setTimeout(() => {
			onConfirm(Array.from(selectedKeys));
		}, 200);
	};

	const handleOtherKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && !e.shiftKey && otherValue.trim()) {
			e.preventDefault();
			setSubmitted(true);
			setTimeout(() => {
				onOtherSubmit?.(otherValue.trim());
			}, 200);
		}
	};

	if (submitted) {
		return <ChipsFadeOut />;
	}

	return (
		<>
			<ChipsContainer>
				{options.map((option) => (
					<ChipButton
						key={option.key}
						chipVariant={option.variant}
						isSelected={selectedKeys.has(option.key)}
						onClick={() => toggleKey(option.key)}
						disabled={disabled}
					>
						{option.label}
					</ChipButton>
				))}

				{selectedKeys.size > 0 && (
					<ContinueButton onClick={handleConfirm}>
						{confirmLabel}
					</ContinueButton>
				)}
			</ChipsContainer>

			{otherPlaceholder && !showOther && (
				<ChipButton
					chipVariant='outline'
					onClick={() => setShowOther(true)}
					disabled={disabled}
					sx={{ mt: 1 }}
				>
					{otherPlaceholder}
				</ChipButton>
			)}

			{showOther && (
				<OtherInput
					size='small'
					placeholder={otherPlaceholder}
					value={otherValue}
					onChange={(e) => setOtherValue(e.target.value)}
					onKeyDown={handleOtherKeyDown}
					autoFocus
				/>
			)}
		</>
	);
};
