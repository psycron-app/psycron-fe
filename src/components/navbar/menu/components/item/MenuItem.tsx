import { Text } from '@psycron/components/text/Text';

import {
	MobileMenuIconWrapper,
	MobileMenuItem,
	StyledMenuItem,
} from './MenuItem.styles';
import type { IMenuItem } from './MenuItem.types';

export const MenuItem = ({
	icon,
	name,
	isFooterIcon,
	isFullList,
	disabled,
}: IMenuItem) => {
	return (
		<>
			{isFullList ? (
				<MobileMenuItem disabled={disabled}>
					<MobileMenuIconWrapper>{icon}</MobileMenuIconWrapper>
					<Text textTransform='capitalize'>{name}</Text>
				</MobileMenuItem>
			) : (
				<StyledMenuItem
					title={name}
					placement='right'
					disabled={disabled}
					$disabled={disabled}
					$isFooterIcon={isFooterIcon}
				>
					{icon}
				</StyledMenuItem>
			)}
		</>
	);
};
