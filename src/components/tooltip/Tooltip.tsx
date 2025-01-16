import type { TooltipProps } from '@mui/material';
import { IconButton, Tooltip as MUITooltip } from '@mui/material';
import { Text } from '@psycron/components/text/Text';

export const Tooltip = ({
	children,
	placement,
	title,
	open,
	...rest
}: TooltipProps) => {
	const Title = (
		<Text isFirstUpper fontSize={'0.7rem'}>
			{title}
		</Text>
	);

	return (
		<MUITooltip arrow placement={placement} title={Title} open={open} {...rest}>
			<IconButton>{children}</IconButton>
		</MUITooltip>
	);
};
