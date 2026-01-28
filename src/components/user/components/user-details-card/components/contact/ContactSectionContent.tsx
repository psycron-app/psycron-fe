import { useTranslation } from 'react-i18next';
import { Button } from '@psycron/components/button/Button';
import { Phone } from '@psycron/components/icons';

import { UserDetailsRow } from '../account/components/UserDetailsRow';

import {
	ContactContainer,
	ContactEmptyIcon,
	ContactEmptyState,
	ContactEmptyTitle,
	ValueText,
} from './ContactSectionContent.styles';
import type { ContactSectionContentProps } from './ContactSectionContent.types';
import { getPreferredContact } from './getPreferredContact';

export const ContactSectionContent = ({
	phone,
	whatsapp,
	onEditContacts,
	rightSlot,
}: ContactSectionContentProps) => {
	const { t } = useTranslation();

	const preferred = getPreferredContact(whatsapp, phone);

	if (preferred.kind === 'empty') {
		return (
			<ContactContainer>
				<ContactEmptyState>
					<ContactEmptyIcon>
						<Phone />
					</ContactEmptyIcon>

					<ContactEmptyTitle>
						{t('components.user-details.section.contact.title-empty')}
					</ContactEmptyTitle>
					<Button type='button' onClick={onEditContacts}>
						{t('components.user-details.add-contacts', {
							contactValue: t('globals.phone'),
						})}
					</Button>
				</ContactEmptyState>
			</ContactContainer>
		);
	}

	const label =
		preferred.kind === 'whatsapp' ? t('globals.whatsapp') : t('globals.phone');

	const right =
		preferred.kind === 'whatsapp' ? rightSlot?.whatsapp : rightSlot?.phone;

	return (
		<ContactContainer>
			<UserDetailsRow
				label={label}
				value={<ValueText>{preferred.value}</ValueText>}
				right={
					right ?? (
						<Button
							type='button'
							tertiary
							variant='outlined'
							onClick={onEditContacts}
						>
							{t('components.user-details.edit-contacts')}
						</Button>
					)
				}
			/>
		</ContactContainer>
	);
};
