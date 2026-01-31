import type { FieldValues, Path } from 'react-hook-form';

export type PasswordFields<T extends FieldValues> = {
	confirmPassword?: Path<T>;
	password?: Path<T>;
};

export type PasswordInputProps<T extends FieldValues> = {
	confirmName?: Path<T>;
	disabled?: boolean;
	fields?: PasswordFields<T>;
	hasToConfirm?: boolean;
	name?: Path<T>;
};
