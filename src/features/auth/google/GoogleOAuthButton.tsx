import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Google } from '@psycron/components/icons';

import {
	StyledGoogleButton,
	StyledStyledGoogleButtonLabel,
} from './GoogleOAuthButton.styles';
import type { GoogleOAuthButtonProps } from './GoogleOAuthButton.types';
import { startGoogleOAuth } from './startGoogleOAuth';

export const GoogleOAuthButton = ({
	locale,
	disabled,
}: GoogleOAuthButtonProps) => {
	const { t } = useTranslation();

	const stayConnected = useWatch({ name: 'stayConnected' });

	return (
		<StyledGoogleButton
			onClick={() => startGoogleOAuth({ locale, stayConnected })}
			disabled={disabled}
			fullWidth
			tertiary
			aria-label={t('auth.continue-google')}
		>
			<Google />
			<StyledStyledGoogleButtonLabel>
				{t('auth.continue-google')}
			</StyledStyledGoogleButtonLabel>
		</StyledGoogleButton>
	);
};
