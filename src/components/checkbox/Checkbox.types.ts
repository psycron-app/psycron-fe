import type { UseFormRegisterReturn } from 'react-hook-form';

export interface ICheckboxProps {
	checked?: boolean;
	labelKey: string;
	onChange?: () => void;
	register: UseFormRegisterReturn | null;
	shouldBold?: boolean;
}
