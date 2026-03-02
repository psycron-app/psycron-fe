import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { capture } from '@psycron/analytics/posthog/events';
import { PostHogEvent } from '@psycron/analytics/posthog/types';
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
	intent,
	audience,
}: GoogleOAuthButtonProps) => {
	const { t } = useTranslation();

	const stayConnected = useWatch({ name: 'stayConnected' }) as
		| boolean
		| undefined;

	const onClick = (): void => {
		capture(PostHogEvent.AuthGoogleOAuthClicked, {
			intent,
			audience,
			locale,
			stay_connected: Boolean(stayConnected),
			area: audience === 'worker' ? 'backoffice' : 'therapist',
		});

		startGoogleOAuth({
			stayConnected: Boolean(stayConnected),
			locale,
			intent,
			audience,
		});
	};

	return (
		<StyledGoogleButton
			onClick={onClick}
			disabled={disabled}
			fullWidth
			tertiary
			variant='outlined'
			size='large'
			aria-label={t('auth.continue-google')}
		>
			<Google />
			<StyledStyledGoogleButtonLabel>
				{t('auth.continue-google')}
			</StyledStyledGoogleButtonLabel>
		</StyledGoogleButton>
	);
};
