import { Box, Button as MUIButton } from '@mui/material';

import { BttnLoader, StyledBttnContentWrapper } from './Button.styles';
import type { IButtonProps } from './Button.types';

export const Button = ({
	secondary,
	tertiary,
	onClick,
	children,
	small,
	fullWidth,
	type,
	loading,
	...props
}: IButtonProps) => {
	const bttnColor = () => {
		switch (true) {
			case secondary:
				return 'secondary';
			case tertiary:
				return 'tertiary';
			default:
				return 'primary';
		}
	};

	return (
		<MUIButton
			color={bttnColor()}
			variant={secondary ? 'outlined' : 'contained'}
			size={small ? 'small' : 'medium'}
			type={type}
			fullWidth={fullWidth}
			disabled={loading}
			onClick={onClick}
			{...props}
		>
			<StyledBttnContentWrapper>
				{loading && <BttnLoader size={25} color='secondary' thickness={5} />}
				<Box component='span' sx={{ mx: 'auto' }}>
					{children}
				</Box>
			</StyledBttnContentWrapper>
		</MUIButton>
	);
};
