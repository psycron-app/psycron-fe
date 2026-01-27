import { Box } from '@mui/material';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import { Text } from '@psycron/components/text/Text';

import type { EditSectionProps } from './EditSection.types';

export const EditSection = ({
	title,
	isEnabled,
	onToggle,
	children,
	disabled,
}: EditSectionProps) => {
	return (
		<Box display='flex' flexDirection='column' gap={2}>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Text variant='subtitle1' fontWeight={700}>
					{title}
				</Text>
				<Switch
					label='Edit'
					defaultChecked={isEnabled}
					onChange={onToggle}
					disabled={disabled}
				/>
			</Box>
			<Box
				sx={{
					opacity: isEnabled ? 1 : 0.6,
					pointerEvents: isEnabled ? 'auto' : 'none',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
