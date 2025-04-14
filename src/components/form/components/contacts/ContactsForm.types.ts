import type { IContactInfo } from '@psycron/context/user/auth/UserAuthenticationContext.types';

export interface ContactsFormProps {
	defaultValues?: IContactInfo;
	disabled?: boolean;
	hasWpp?: boolean;
	required: boolean;
}
