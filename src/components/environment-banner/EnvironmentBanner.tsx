import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';
import { BACKOFFICE } from '@psycron/pages/urls';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
	Actions,
	Banner,
	BannerHeader,
	Content,
} from './EnvironmentBanner.styles';
import type { EnvironmentBannerProps } from './EnvironmentBanner.types';

export const EnvironmentBanner = ({ isVisible }: EnvironmentBannerProps) => {
	const navigate = useNavigate();
	const [isExpanded, setIsExpanded] = useState(true);

	const shouldRender = useMemo(() => isVisible, [isVisible]);
	if (!shouldRender) return null;

	const handleBackofficeClick = (): void => {
		navigate(BACKOFFICE);
	};

	return (
		<Banner role='alert' aria-live='polite'>
			<BannerHeader>
				<Text>{'Testing environment'}</Text>

				<Actions>
					<Button onClick={handleBackofficeClick} small>
						{'Backoffice'}
					</Button>

					<IconButton
						onMouseDown={() => setIsExpanded((prev) => !prev)}
						aria-expanded={isExpanded}
						aria-controls='testing-banner-content'
					>
						{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
					</IconButton>
				</Actions>
			</BannerHeader>

			{isExpanded ? (
				<Content id='testing-banner-content'>
					<Text variant='caption'>
						{'All actions here are scoped to the testing mode session.'}
					</Text>
					<Text variant='caption'>
						{'Use the backoffice button anytime to return.'}
					</Text>
				</Content>
			) : null}
		</Banner>
	);
};
