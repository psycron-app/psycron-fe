import type { TooltipProps } from '@mui/material';
import { IconButton, Tooltip as MUITooltip } from '@mui/material';
import { Text } from '@psycron/components/text/Text';

export const Tooltip = ({
	children,
	placement,
	title,
	open,
	disabled,
	...rest
}: TooltipProps & { disabled?: boolean }) => {
	const Title = (
		<Text isFirstUpper fontSize={'0.7rem'}>
			{title}
		</Text>
	);

	return (
		<MUITooltip arrow placement={placement} title={Title} open={open} {...rest}>
			<span
				style={{
					cursor: disabled ? 'not-allowed' : 'pointer',
					display: 'flex',
				}}
			>
				<IconButton disabled={disabled}>{children}</IconButton>
			</span>
		</MUITooltip>
	);
};
