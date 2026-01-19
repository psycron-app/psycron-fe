import type { FieldValues, Path } from 'react-hook-form';

export type PasswordInputProps<T extends FieldValues> = {
	confirmName?: Path<T>;
	disabled?: boolean;
	hasToConfirm?: boolean;
	name?: Path<T>;
};
