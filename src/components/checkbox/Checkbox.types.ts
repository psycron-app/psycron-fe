import type { ChangeEvent, ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Uncontrolled = {
	checked?: never;
	onChange?: never;
	register?: UseFormRegisterReturn;
};

type Controlled = {
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	register?: never;
};

type WithLabelNode = {
	label: ReactNode;
	labelKey?: never;
};

type WithLabelKey = {
	// i18n key
	label?: never;
	labelKey: string;
};

export type ICheckboxProps = (Uncontrolled | Controlled) &
	(WithLabelNode | WithLabelKey) & {
		required?: boolean;
		shouldBold?: boolean;
	};
