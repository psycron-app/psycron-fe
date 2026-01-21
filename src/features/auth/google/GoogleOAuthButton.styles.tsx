import styled from '@emotion/styled';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const StyledGoogleButton = styled(Button)`
	& svg {
		width: ${spacing.medium};
		height: ${spacing.medium};
		margin-right: ${spacing.xs};

		:hover {
		}
	}
	& span {
		display: flex;
		align-items: center;
	}
`;

export const StyledStyledGoogleButtonLabel = styled(Text)`
	font-weight: 600;
`;
