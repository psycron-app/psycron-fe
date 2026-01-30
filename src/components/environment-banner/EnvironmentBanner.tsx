import { type FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';
import { BACKOFFICE } from '@psycron/pages/urls';
import { ChevronDown, ChevronUp, FlaskConical } from 'lucide-react';

import {
	Actions,
	Banner,
	BannerHeader,
	Content,
	IconWrapper,
} from './EnvironmentBanner.styles';

type EnvironmentBannerProps = {
	isVisible: boolean;
};

export const EnvironmentBanner: FC<EnvironmentBannerProps> = ({
	isVisible,
}) => {
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
				<IconWrapper aria-hidden='true'>
					<FlaskConical size={18} />
				</IconWrapper>

				<Text>{'You are in testing environment.'}</Text>

				<Actions>
					<Button secondary onClick={handleBackofficeClick} small>
						{'Backoffice'}
					</Button>

					<Button
						tertiary
						onClick={() => setIsExpanded((prev) => !prev)}
						small
						aria-expanded={isExpanded}
						aria-controls='testing-banner-content'
					>
						{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
					</Button>
				</Actions>
			</BannerHeader>

			{isExpanded ? (
				<Content id='testing-banner-content'>
					<Text variant='caption'>
						{'All actions here are scoped to the testing mode session. ' +
							'Use the backoffice button anytime to return.'}
					</Text>
				</Content>
			) : null}
		</Banner>
	);
};
