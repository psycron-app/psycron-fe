import { Tooltip } from '@mui/material';
import { Text } from '@psycron/components/text/Text';

import { StyledContactLink } from './ContactLink.styles';

interface IContactLink {
	message?: string;
	tooltip: string;
	type: 'whatsapp' | 'phone' | 'email';
	value: string;
}

export const ContactLink = ({
	type,
	value,
	message,
	tooltip,
}: IContactLink) => {
	if (!value) return <Text px={1}>N/A</Text>;

	let href = '';

	switch (type) {
		case 'whatsapp':
			href = `https://wa.me/${value}?text=${encodeURIComponent(message || '')}`;
			break;
		case 'phone':
			href = `tel:${value}`;
			break;
		case 'email':
			href = `mailto:${value}?subject=${encodeURIComponent(message || '')}`;
			break;
		default:
			return null;
	}

	return (
		<Tooltip title={tooltip} arrow placement='right-end'>
			<StyledContactLink
				href={href}
				target={type === 'whatsapp' ? '_blank' : '_self'}
				rel='noopener noreferrer'
			>
				{value}
			</StyledContactLink>
		</Tooltip>
	);
};
