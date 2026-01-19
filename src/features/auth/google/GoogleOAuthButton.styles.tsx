import styled from '@emotion/styled';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';

export const StyledGoogleButton = styled(Button)`
	& svg {
		width: 24px;
		height: 24px;
		margin-right: 10px;

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
