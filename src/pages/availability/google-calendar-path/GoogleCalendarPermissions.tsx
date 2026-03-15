import { useTranslation } from 'react-i18next';

import {
	BackButton,
	ButtonRow,
	ContinueBtn,
	PermissionItem,
	PermissionsCard,
	PermissionsIntro,
	PrivacyNote,
} from './GoogleCalendarPermissions.styles';

interface GoogleCalendarPermissionsProps {
	onBack: () => void;
	onContinue: () => void;
}

export const GoogleCalendarPermissions = ({
	onContinue,
	onBack,
}: GoogleCalendarPermissionsProps) => {
	const { t } = useTranslation();

	return (
		<PermissionsCard>
			<PermissionsIntro>
				{t('jupiter.google-calendar.permissions-intro')}
			</PermissionsIntro>

			<PermissionItem>
				{t('jupiter.google-calendar.permission-1')}
			</PermissionItem>
			<PermissionItem>
				{t('jupiter.google-calendar.permission-2')}
			</PermissionItem>
			<PermissionItem>
				{t('jupiter.google-calendar.permission-3')}
			</PermissionItem>

			<PrivacyNote>
				{t('jupiter.google-calendar.privacy-note')}
			</PrivacyNote>

			<ButtonRow>
				<BackButton onClick={onBack}>
					{t('jupiter.google-calendar.back')}
				</BackButton>
				<ContinueBtn onClick={onContinue}>
					{t('jupiter.google-calendar.continue')}
				</ContinueBtn>
			</ButtonRow>
		</PermissionsCard>
	);
};
