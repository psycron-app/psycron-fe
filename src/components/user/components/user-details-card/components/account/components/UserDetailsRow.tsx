import {
	UserDetailsRowContainer,
	UserDetailsRowLabel,
	UserDetailsRowRight,
	UserDetailsRowValue,
} from './UserDetailsRow.styles';
import type { UserDetailsRowProps } from './UserDetailsRow.types';

export const UserDetailsRow = ({
	label,
	value,
	right,
}: UserDetailsRowProps) => {
	return (
		<UserDetailsRowContainer>
			<UserDetailsRowLabel>{label}</UserDetailsRowLabel>
			<UserDetailsRowValue>
				{value}
				{right ? <UserDetailsRowRight>{right}</UserDetailsRowRight> : null}
			</UserDetailsRowValue>
		</UserDetailsRowContainer>
	);
};
