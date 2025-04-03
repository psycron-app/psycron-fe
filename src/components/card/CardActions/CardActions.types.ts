export type CardActionsProps = {
	actionName: string;
	disabled?: boolean;
	hasSecondAction?: boolean;
	hasTertiary?: boolean;
	loading?: boolean;
	onClick?: () => void;
	secondAction?: () => void;
	secondActionName?: string;
	tertiaryAction?: () => void;
	tertiaryActionName?: string;
	type?: 'button' | 'submit' | 'reset';
};
